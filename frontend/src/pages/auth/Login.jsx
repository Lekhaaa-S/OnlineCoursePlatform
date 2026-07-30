import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-background-50">
      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-950 mb-1">Welcome back</h1>
          <p className="text-sm text-text-700">Sign in to your account</p>
        </div>

        <div className="bg-background-200 rounded-xl border border-background-300/30 p-7 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-700 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
                className="input-field" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-700 mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter password"
                className="input-field" />
            </div>

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors duration-300">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-text-950 border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center mt-5 text-sm text-text-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-primary-400 hover:text-primary-300 transition-colors duration-300">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
