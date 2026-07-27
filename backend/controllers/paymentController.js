// Payment Controller
//
// createOrder(req, res)
//   POST /api/payment/create-order (protected)
//   Body: { courseId }
//   Response: { orderId, amount, currency: "INR", key_id }
//
// verifyPayment(req, res)
//   POST /api/payment/verify (protected)
//   Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId }
//   Response: { message, enrollment }
