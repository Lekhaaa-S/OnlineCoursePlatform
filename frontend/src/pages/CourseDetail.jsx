import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { courseAPI, enrollmentAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { HiClock, HiUsers, HiBookOpen, HiStar, HiCheckCircle } from 'react-icons/hi'

const CourseDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await courseAPI.getById(id)
        setCourse(data)
      } catch (err) {
        toast.error('Course not found')
        navigate('/courses')
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id, navigate])

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to enroll')
      navigate('/login')
      return
    }
    setEnrolling(true)
    try {
      const { data } = await paymentAPI.createOrder({ courseId: id })
      const options = {
        key: data.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'LearnHub',
        description: course.title,
        order_id: data.orderId,
        handler: async (response) => {
          try {
            await paymentAPI.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: id,
            })
            toast.success('Enrolled successfully!')
            navigate('/dashboard')
          } catch {
            toast.error('Payment verification failed')
          }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: '#6366f1' },
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed')
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!course) return null

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {course.category && (
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary-light text-xs font-semibold rounded-full mb-4">
                  {course.category}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">{course.description}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                {course.instructor && (
                  <span className="flex items-center gap-1.5"><HiUsers className="w-4 h-4" /> {course.instructor}</span>
                )}
                {course.modules && (
                  <span className="flex items-center gap-1.5"><HiBookOpen className="w-4 h-4" /> {course.modules.length} modules</span>
                )}
                <span className="flex items-center gap-1.5"><HiStar className="w-4 h-4 text-amber-400" /> 4.8 rating</span>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 text-slate-800 sticky top-24">
                <div className="mb-4">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover rounded-xl" />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary/20">{course.title?.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="text-3xl font-bold text-primary mb-4">₹{course.price}</div>
                <button onClick={handleEnroll} disabled={enrolling}
                  className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-60 mb-4">
                  {enrolling ? 'Processing...' : 'Enroll Now'}
                </button>
                <p className="text-center text-xs text-slate-400">30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {course.modules && course.modules.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Course Content</h2>
          <div className="space-y-3">
            {course.modules.map((mod, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200/60 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-slate-800">{mod.title}</h3>
                </div>
                {mod.lessons && mod.lessons.length > 0 && (
                  <div className="ml-11 space-y-2">
                    {mod.lessons.map((lesson, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-slate-500">
                        <HiCheckCircle className="w-4 h-4 text-slate-300" />
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
    </div>
  )
}

export default CourseDetail
