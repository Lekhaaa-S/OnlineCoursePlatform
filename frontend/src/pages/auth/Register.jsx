import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await register(name, email, password)
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-background-50">
      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-950 mb-1">Create Account</h1>
          <p className="text-sm text-text-700">Start learning today</p>
        </div>

        <div className="bg-background-200 rounded-xl border border-background-300/30 p-7 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-700 mb-1.5">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe"
                className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-700 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
                className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-700 mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Min 6 characters"
                className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-700 mb-1.5">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm password"
                className="input-field" />
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-text-950 border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </span>
              ) : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center mt-5 text-sm text-text-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary-400 hover:text-primary-300 transition-colors duration-300">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
