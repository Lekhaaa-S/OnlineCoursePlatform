import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { courseAPI, paymentAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { HiClock, HiUsers, HiBookOpen, HiCheckCircle, HiPlay, HiX } from 'react-icons/hi'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const cardStyle = {
  style: {
    base: {
      fontSize: '15px',
      color: '#e2e2ef',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': { color: '#6b7280' },
    },
  },
}

const PaymentForm = ({ clientSecret, courseId, onSuccess, onCancel }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setProcessing(true)
    setError('')
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    })
    if (confirmError) { setError(confirmError.message); setProcessing(false); return }
    try {
      await paymentAPI.verify({ paymentIntentId: paymentIntent.id, courseId })
      onSuccess()
    } catch { setError('Verification failed'); setProcessing(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement options={cardStyle} />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={!stripe || processing}
          className="flex-1 py-2.5 bg-primary-500 text-text-950 font-semibold rounded-lg text-sm hover:bg-primary-600 transition-all disabled:opacity-60">
          {processing ? 'Processing...' : 'Pay'}
        </button>
        <button type="button" onClick={onCancel} disabled={processing}
          className="px-4 py-2.5 bg-background-300 text-text-800 rounded-lg text-sm hover:bg-background-400 transition-all">
          Cancel
        </button>
      </div>
    </form>
  )
}

const CourseDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await courseAPI.getById(id)
        setCourse(data)
      } catch {
        toast.error('Course not found')
        navigate('/courses')
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id, navigate])

  const handleEnroll = async () => {
    if (!isAuthenticated) { toast.error('Please login to enroll'); navigate('/login'); return }
    setEnrolling(true)
    try {
      const { data } = await paymentAPI.createPaymentIntent({ courseId: id })
      setClientSecret(data.clientSecret)
      setShowPayment(true)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed')
    } finally { setEnrolling(false) }
  }

  const handlePaymentSuccess = () => {
    toast.success('Enrolled successfully!')
    setShowPayment(false)
    navigate('/dashboard')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background-50"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>
  if (!course) return null

  const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0

  return (
    <div className="min-h-screen bg-background-50">
      <div className="relative bg-background-100/60 py-14 border-b border-background-300/20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30"></div>
        <div className="absolute -top-24 -left-10 w-80 h-80 rounded-full glow-orb-primary"></div>
        <div className="absolute top-10 -right-20 w-72 h-72 rounded-full glow-orb-accent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 animate-slide-up">
              {course.category && <span className="eyebrow mb-4">{course.category}</span>}
              <h1 className="text-3xl md:text-4xl font-bold text-text-950 mb-4 leading-tight">{course.title}</h1>
              <p className="text-text-600 mb-6 leading-relaxed">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-600">
                {course.instructor && <span className="flex items-center gap-1.5"><HiUsers className="w-4 h-4 text-primary-400" /> {course.instructor}</span>}
                {course.modules && <span className="flex items-center gap-1.5"><HiBookOpen className="w-4 h-4 text-primary-400" /> {course.modules.length} modules</span>}
                <span className="flex items-center gap-1.5"><HiPlay className="w-4 h-4 text-primary-400" /> {totalLessons} lessons</span>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="gradient-border rounded-xl shadow-card p-5 sticky top-24 animate-scale-in">
                <div className="mb-4 rounded-lg overflow-hidden">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover" />
                  ) : (
                    <div className="w-full h-44 bg-gradient-to-br from-primary-500/25 via-secondary-500/20 to-accent-500/10 flex items-center justify-center">
                      <span className="text-4xl font-black text-text-950/15">{course.title?.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="text-3xl font-bold text-text-950 mb-1">₹{course.price}</div>
                <button onClick={handleEnroll} disabled={enrolling}
                  className="btn-primary w-full mt-4 mb-4 active:scale-[0.98] shadow-glow-primary">
                  {enrolling ? 'Processing...' : 'Enroll Now'}
                </button>
                <div className="space-y-2.5 text-sm text-text-600">
                  <div className="flex items-center gap-2.5"><HiCheckCircle className="w-4 h-4 text-accent-500 shrink-0" /> Full lifetime access</div>
                  <div className="flex items-center gap-2.5"><HiCheckCircle className="w-4 h-4 text-accent-500 shrink-0" /> Certificate of completion</div>
                  <div className="flex items-center gap-2.5"><HiCheckCircle className="w-4 h-4 text-accent-500 shrink-0" /> Access on all devices</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {course.modules?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-bold text-text-950 mb-5">Course Content</h2>
          <div className="space-y-3">
            {course.modules.map((mod, i) => (
              <div key={i} className="bg-background-200 rounded-xl border border-background-300/30 overflow-hidden transition-all duration-300 hover:border-background-300/50">
                <div className="flex items-center gap-3 p-4 bg-background-200/50">
                  <div className="w-8 h-8 bg-primary-500/15 text-primary-400 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                  <h3 className="font-semibold text-text-900">{mod.title}</h3>
                </div>
                {mod.lessons?.length > 0 && (
                  <div className="px-4 pb-4 space-y-1">
                    {mod.lessons.map((lesson, j) => (
                      <div key={j} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-background-300/20 transition-all duration-200 text-sm text-text-600 cursor-pointer">
                        <HiPlay className="w-3.5 h-3.5 text-text-500 shrink-0" />
                        {lesson.title || lesson.name || `Lesson ${j + 1}`}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {showPayment && clientSecret && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-background-100 rounded-2xl p-6 max-w-md w-full mx-4 border border-background-300/30 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-text-950">Complete Payment</h3>
              <button onClick={() => setShowPayment(false)} className="p-1 text-text-600 hover:text-text-950 transition-colors">
                <HiX className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-text-600 mb-5">Enter your card details to enroll in <strong className="text-text-900">{course.title}</strong></p>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm clientSecret={clientSecret} courseId={id} onSuccess={handlePaymentSuccess} onCancel={() => setShowPayment(false)} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseDetail
