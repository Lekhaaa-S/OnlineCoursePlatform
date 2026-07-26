import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { HiAcademicCap } from 'react-icons/hi'
import AdminSidebar from '../../components/AdminSidebar'

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-4 h-16 flex items-center justify-between sticky top-0 z-50">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <HiAcademicCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">LearnHub</span>
        </Link>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">Admin Panel</span>
      </nav>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
