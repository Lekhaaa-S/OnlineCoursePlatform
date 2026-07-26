import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiAcademicCap } from 'react-icons/hi'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-background-50 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full glow-orb-primary"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full glow-orb-accent"></div>
      <div className="absolute inset-0 dot-grid opacity-30"></div>
      <div className="relative w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-glow-primary animate-pulse-glow">
            <HiAcademicCap className="w-6 h-6 text-text-950" />
          </div>
          <h1 className="text-2xl font-bold text-text-950 mb-1">Welcome back</h1>
          <p className="text-sm text-text-700">Sign in to your account</p>
        </div>

        <div className="gradient-border rounded-xl p-7 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group">
              <label className="block text-sm font-medium text-text-700 mb-1.5">Email</label>
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-500 group-focus-within:text-primary-400 transition-colors duration-300" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
                  className="input-field pl-10" />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-text-700 mb-1.5">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-500 group-focus-within:text-primary-400 transition-colors duration-300" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter password"
                  className="input-field pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-500 hover:text-text-900 transition-colors duration-300">
                  {showPassword ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-text-600 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-background-400 text-primary-500 focus:ring-primary-500/30 bg-background-100" />
                <span className="group-hover:text-text-800 transition-colors duration-300">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors duration-300">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full active:scale-[0.98]">
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
