import { NavLink } from 'react-router-dom'
import { HiOutlineChartBar, HiOutlineCollection, HiOutlineUserGroup, HiOutlinePlusCircle, HiOutlineCog } from 'react-icons/hi'

const AdminSidebar = () => {
  const links = [
    { to: '/admin', icon: HiOutlineChartBar, label: 'Dashboard', end: true },
    { to: '/admin/courses', icon: HiOutlineCollection, label: 'Manage Courses' },
    { to: '/admin/courses/add', icon: HiOutlinePlusCircle, label: 'Add Course' },
    { to: '/admin/users', icon: HiOutlineUserGroup, label: 'Manage Users' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4 hidden lg:block">
      <div className="mb-6 px-3">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Admin Panel</h2>
      </div>
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
