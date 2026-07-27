const Razorpay = require("razorpay");
const crypto = require("crypto");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payment/create-order
exports.createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyEnrolled = await Enrollment.findOne({
      userId: req.user._id,
      courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `receipt_${courseId}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/payment/verify
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const alreadyEnrolled = await Enrollment.findOne({
      userId: req.user._id,
      courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({
      userId: req.user._id,
      courseId,
    });

    res.json({ message: "Payment verified and enrolled successfully", enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
