import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { userAPI } from '../services/api'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await userAPI.updateProfile({ name, email })
      updateUser(data.user || data)
      toast.success('Profile updated!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally { setLoading(false) }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await userAPI.changePassword({ currentPassword, newPassword })
      toast.success('Password changed!')
      setCurrentPassword('')
      setNewPassword('')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-background-50">
      <div className="bg-background-100/50 py-8 border-b border-background-300/20">
        <div className="max-w-2xl mx-auto px-4 text-center animate-slide-up">
          <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center text-text-950 text-2xl font-bold mx-auto mb-3 shadow-glow-primary">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <h1 className="text-xl font-bold text-text-950 mb-0.5">{user?.name}</h1>
          <p className="text-sm text-text-600 mb-2">{user?.email}</p>
          <span className="inline-block px-3 py-0.5 bg-primary-500/15 text-primary-400 text-xs font-semibold rounded-md capitalize">{user?.role}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-4 pb-12 space-y-5">
        <div className="bg-background-200 rounded-xl border border-background-300/30 p-6 shadow-soft animate-slide-up delay-100">
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <h3 className="text-xs font-bold text-text-500 uppercase tracking-wider">Profile</h3>
            <div>
              <label className="block text-sm font-medium text-text-700 mb-1.5">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-700 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="input-field" />
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="bg-background-200 rounded-xl border border-background-300/30 p-6 shadow-soft animate-slide-up delay-200">
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <h3 className="text-xs font-bold text-text-500 uppercase tracking-wider">Change Password</h3>
            <div>
              <label className="block text-sm font-medium text-text-700 mb-1.5">Current Password</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required
                className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-700 mb-1.5">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required
                className="input-field" />
            </div>
            <button type="submit" disabled={loading}
              className="btn-secondary">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
