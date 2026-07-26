import { useState, useEffect } from 'react'
import { userAPI, courseAPI, enrollmentAPI } from '../../services/api'
import { HiUsers, HiCollection, HiCurrencyDollar, HiTrendingUp } from 'react-icons/hi'

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0, totalRevenue: 0, totalEnrollments: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await userAPI.getStats()
        setStats(data)
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Total Users', value: stats.totalUsers || 0, icon: HiUsers, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' },
    { label: 'Total Courses', value: stats.totalCourses || 0, icon: HiCollection, color: 'from-purple-500 to-violet-500', bg: 'bg-purple-50' },
    { label: 'Enrollments', value: stats.totalEnrollments || 0, icon: HiTrendingUp, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50' },
    { label: 'Revenue', value: `₹${stats.totalRevenue || 0}`, icon: HiCurrencyDollar, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center`}>
                <card.icon className={`w-6 h-6 bg-gradient-to-r ${card.color} bg-clip-text`} style={{ color: '#6366f1' }} />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">
              {loading ? <div className="h-8 w-16 bg-slate-200 rounded animate-pulse"></div> : card.value}
            </div>
            <div className="text-sm text-slate-500">{card.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h2>
        <p className="text-sm text-slate-500">No recent activity to display.</p>
      </div>
    </div>
  )
}

export default AdminDashboard
