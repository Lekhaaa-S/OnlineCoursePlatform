import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { enrollmentAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { HiBookOpen, HiClock, HiArrowRight, HiCheckCircle } from 'react-icons/hi'

const Dashboard = () => {
  const { user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const { data } = await enrollmentAPI.getMyCourses()
        setEnrolledCourses(data.enrollments || data || [])
      } catch (err) {
        console.error('Failed to fetch enrolled courses:', err)
      } finally { setLoading(false) }
    }
    fetchMyCourses()
  }, [])

  const stats = [
    { label: 'Enrolled', value: enrolledCourses.length, icon: HiBookOpen, bg: 'bg-primary-500/15', color: 'text-primary-400' },
    { label: 'Completed', value: 0, icon: HiCheckCircle, bg: 'bg-accent-500/15', color: 'text-accent-500' },
    { label: 'Hours', value: '0h', icon: HiClock, bg: 'bg-secondary-500/15', color: 'text-secondary-400' },
  ]

  return (
    <div className="min-h-screen bg-background-50">
      <div className="bg-background-100/50 py-8 border-b border-background-300/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-slide-up">
          <h1 className="text-2xl font-bold text-text-950 mb-0.5">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-sm text-text-600">Your learning dashboard</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-12">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-background-200 rounded-xl border border-background-300/30 p-4 card-hover animate-slide-up hover:border-primary-500/15" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="text-xl font-bold text-text-950">{loading ? '-' : s.value}</div>
              <div className="text-xs text-text-600 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-text-950">My Courses</h2>
          <Link to="/courses" className="text-sm font-semibold text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors duration-300 group">
            Browse More <HiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background-200 rounded-xl border border-background-300/30 p-5 animate-pulse">
                <div className="h-5 bg-background-300/40 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-background-300/20 rounded w-1/2 mb-4"></div>
                <div className="h-2 bg-background-300/20 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.map((enrollment, i) => (
              <Link key={enrollment._id} to={`/learn/${enrollment.courseId?._id || enrollment.courseId}`}
                className="group bg-background-200 rounded-xl border border-background-300/30 p-5 card-hover animate-slide-up hover:border-primary-500/15" style={{ animationDelay: `${i * 0.08}s` }}>
                <h3 className="font-semibold text-text-900 mb-1 group-hover:text-primary-400 transition-colors duration-300">{enrollment.courseId?.title || 'Course'}</h3>
                <p className="text-xs text-text-500 mb-4">Continue where you left off</p>
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-text-500 mb-1"><span>Progress</span><span>0%</span></div>
                  <div className="h-1.5 bg-background-300/30 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary-400 flex items-center gap-1 mt-3 group-hover:gap-2 transition-all duration-300">
                  Continue <HiArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-14 bg-background-200 rounded-xl border border-background-300/30 animate-fade-in">
            <HiBookOpen className="w-10 h-10 text-text-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-text-700 mb-1">No courses yet</h3>
            <p className="text-sm text-text-500 mb-4">Enroll in a course to get started</p>
            <Link to="/courses" className="btn-primary inline-flex items-center gap-1.5 text-sm">
              Browse Courses <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
