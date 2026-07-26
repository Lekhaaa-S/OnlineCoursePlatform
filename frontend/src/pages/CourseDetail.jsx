import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { courseAPI, paymentAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { HiClock, HiUsers, HiBookOpen, HiCheckCircle, HiPlay } from 'react-icons/hi'

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
      const { data } = await paymentAPI.createOrder({ courseId: id })
      const options = {
        key: data.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount, currency: data.currency || 'INR',
        name: 'LearnHub', description: course.title, order_id: data.orderId,
        handler: async (response) => {
          try {
            await paymentAPI.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature, courseId: id,
            })
            toast.success('Enrolled successfully!')
            navigate('/dashboard')
          } catch { toast.error('Payment verification failed') }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: '#8e3333' },
      }
      new window.Razorpay(options).open()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed')
    } finally { setEnrolling(false) }
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
    </div>
  )
}

export default CourseDetail
