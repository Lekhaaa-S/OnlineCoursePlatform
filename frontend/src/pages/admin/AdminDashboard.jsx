import { HiUsers, HiBookOpen, HiCurrencyDollar, HiTrendingUp } from 'react-icons/hi'

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-background-200 rounded-xl border border-background-300/30 p-5 card-hover animate-scale-in hover:border-primary-500/15">
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-2xl font-bold text-text-950">{value}</div>
        <div className="text-sm text-text-600 font-medium">{label}</div>
      </div>
    </div>
  </div>
)

const AdminDashboard = () => {
  const stats = [
    { icon: HiUsers, label: 'Users', value: '-', color: 'bg-primary-500/15 text-primary-400' },
    { icon: HiBookOpen, label: 'Courses', value: '-', color: 'bg-accent-500/15 text-accent-500' },
    { icon: HiCurrencyDollar, label: 'Revenue', value: '-', color: 'bg-secondary-500/15 text-secondary-400' },
    { icon: HiTrendingUp, label: 'Enrollments', value: '-', color: 'bg-primary-500/10 text-primary-300' },
  ]

  return (
    <div className="animate-slide-up">
      <h1 className="text-xl font-bold text-text-950 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>
      <div className="bg-background-200 rounded-xl border border-background-300/30 p-6 text-center">
        <p className="text-sm text-text-500">Connect the backend to see live stats.</p>
      </div>
    </div>
  )
}

export default AdminDashboard
