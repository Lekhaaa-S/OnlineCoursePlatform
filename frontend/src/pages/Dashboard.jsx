import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { enrollmentAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { HiBookOpen, HiClock, HiArrowRight, HiAcademicCap } from 'react-icons/hi'

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
      } finally {
        setLoading(false)
      }
    }
    fetchMyCourses()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Welcome back, {user?.name}!</h1>
          <p className="text-slate-500">Continue your learning journey</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <HiBookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{enrolledCourses.length}</div>
                <div className="text-sm text-slate-500">Enrolled Courses</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <HiAcademicCap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">0</div>
                <div className="text-sm text-slate-500">Completed</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <HiClock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">0h</div>
                <div className="text-sm text-slate-500">Learning Time</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">My Courses</h2>
          <Link to="/courses" className="text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1">
            Browse More <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200/60 p-6 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-slate-100 rounded w-1/2 mb-6"></div>
                <div className="h-2 bg-slate-100 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((enrollment) => (
              <Link key={enrollment._id} to={`/learn/${enrollment.courseId?._id || enrollment.courseId}`}
                className="group bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                  {enrollment.courseId?.title || 'Course'}
                </h3>
                <p className="text-sm text-slate-400 mb-4">Continue learning</p>
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/60">
            <HiBookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No courses yet</h3>
            <p className="text-slate-400 mb-4">Start your learning journey today!</p>
            <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl text-sm hover:shadow-lg transition-all">
              Browse Courses <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
