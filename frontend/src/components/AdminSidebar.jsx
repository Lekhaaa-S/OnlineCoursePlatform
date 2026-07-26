import { Link, useLocation } from 'react-router-dom'
import { HiViewGrid, HiAcademicCap, HiUserGroup } from 'react-icons/hi'

const links = [
  { to: '/admin', icon: HiViewGrid, label: 'Dashboard', end: true },
  { to: '/admin/courses', icon: HiAcademicCap, label: 'Courses' },
  { to: '/admin/users', icon: HiUserGroup, label: 'Users' },
]

export default function AdminSidebar() {
  const { pathname } = useLocation()
  return (
    <aside className="w-56 bg-background-100 border-r border-background-300/20 shrink-0 h-full overflow-y-auto">
      <div className="p-5 border-b border-background-300/20">
        <Link to="/admin" className="font-bold text-text-950 text-lg tracking-tight hover:text-primary-400 transition-colors duration-300">LearnHub</Link>
        <p className="text-[10px] text-text-500 uppercase tracking-widest font-semibold mt-0.5">Admin Panel</p>
      </div>
      <nav className="p-3 space-y-0.5">
        {links.map(({ to, icon: Icon, label, end }) => {
          const active = end ? pathname === to : pathname.startsWith(to)
          return (
            <Link key={to} to={to}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                active ? 'bg-primary-500/15 text-primary-400 border border-primary-500/20' : 'text-text-600 hover:bg-background-200/60 hover:text-text-900'
              }`}>
              <Icon className="w-4 h-4 shrink-0" /> {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
