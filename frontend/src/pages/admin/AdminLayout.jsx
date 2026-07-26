import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/AdminSidebar'

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-background-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-6xl mx-auto"><Outlet /></div>
      </main>
    </div>
  )
}
