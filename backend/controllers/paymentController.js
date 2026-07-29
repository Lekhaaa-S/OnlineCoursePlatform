const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

// POST /api/payment/create-payment-intent
exports.createPaymentIntent = async (req, res) => {
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

    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.price * 100,
      currency: "inr",
      metadata: { courseId, userId: req.user._id.toString() },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/payment/verify
exports.verifyPayment = async (req, res) => {
  try {
    const { paymentIntentId, courseId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment not successful" });
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

    res.json({ message: "Payment successful and enrolled", enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
