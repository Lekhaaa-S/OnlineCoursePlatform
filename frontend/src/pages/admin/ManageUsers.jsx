import { useState, useEffect } from 'react'
import { userAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { HiSearch } from 'react-icons/hi'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await userAPI.getAll()
        setUsers(data.users || data || [])
      } catch { toast.error('Failed to load users') }
      finally { setLoading(false) }
    }
    fetchUsers()
  }, [])

  const handleRoleChange = async (userId, newRole) => {
    try {
      await userAPI.updateRole(userId, { role: newRole })
      setUsers(users.map((u) => u._id === userId ? { ...u, role: newRole } : u))
      toast.success('Role updated')
    } catch { toast.error('Failed to update role') }
  }

  const filtered = users.filter((u) => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="animate-slide-up">
      <h1 className="text-xl font-bold text-text-950 mb-6">Manage Users</h1>
      <div className="bg-background-200 rounded-xl border border-background-300/30 overflow-hidden">
        <div className="p-4 border-b border-background-300/20">
          <div className="relative max-w-xs group">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-500 group-focus-within:text-primary-400 transition-colors duration-300" />
            <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-background-300/20">
              <th className="text-left px-5 py-3 font-semibold text-text-500 text-xs uppercase tracking-wider">User</th>
              <th className="text-left px-5 py-3 font-semibold text-text-500 text-xs uppercase tracking-wider">Role</th>
              <th className="text-left px-5 py-3 font-semibold text-text-500 text-xs uppercase tracking-wider">Joined</th>
              <th className="text-right px-5 py-3 font-semibold text-text-500 text-xs uppercase tracking-wider">Action</th>
            </tr></thead>
            <tbody className="divide-y divide-background-300/15">
              {loading ? (
                <tr><td colSpan="4" className="px-5 py-10 text-center text-text-500">Loading...</td></tr>
              ) : filtered.length > 0 ? filtered.map((user) => (
                <tr key={user._id} className="hover:bg-background-300/10 transition-colors duration-200">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-500/15 text-primary-400 rounded-lg flex items-center justify-center text-xs font-bold shrink-0">{user.name?.charAt(0)?.toUpperCase()}</div>
                      <div>
                        <div className="font-semibold text-text-900">{user.name}</div>
                        <div className="text-xs text-text-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${
                      user.role === 'admin' ? 'bg-accent-500/15 text-accent-400' : 'bg-background-300/30 text-text-600'
                    }`}>{user.role || 'student'}</span>
                  </td>
                  <td className="px-5 py-3.5 text-text-500 text-xs">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
                  <td className="px-5 py-3.5 text-right">
                    <select value={user.role || 'student'} onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="input-field py-1 px-2 text-xs w-auto cursor-pointer">
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="px-5 py-10 text-center text-text-500">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
