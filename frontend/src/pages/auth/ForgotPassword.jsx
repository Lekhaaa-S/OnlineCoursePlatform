import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { HiMail, HiArrowLeft, HiCheckCircle, HiAcademicCap } from 'react-icons/hi'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authAPI.forgotPassword(email)
      setSent(true)
      toast.success('Reset link sent!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-background-50 overflow-hidden">
      <div className="absolute -top-40 -left-32 w-80 h-80 rounded-full glow-orb-primary"></div>
      <div className="absolute -bottom-40 -right-32 w-64 h-64 rounded-full glow-orb-secondary"></div>
      <div className="absolute inset-0 dot-grid opacity-30"></div>
      <div className="relative w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-glow-primary animate-pulse-glow">
            <HiAcademicCap className="w-6 h-6 text-text-950" />
          </div>
          <h1 className="text-2xl font-bold text-text-950 mb-1">Reset Password</h1>
          <p className="text-sm text-text-700">We'll send you a reset link</p>
        </div>

        <div className="gradient-border rounded-xl p-7 shadow-card">
          {sent ? (
            <div className="text-center py-6 animate-scale-in">
              <HiCheckCircle className="w-12 h-12 text-accent-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-text-950 mb-1">Check your email</h3>
              <p className="text-sm text-text-600">Sent to <strong className="text-text-800">{email}</strong></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-text-700 mb-1.5">Email address</label>
                <div className="relative">
                  <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-500 group-focus-within:text-primary-400 transition-colors duration-300" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
                    className="input-field pl-10" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full active:scale-[0.98]">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center mt-5 text-sm">
          <Link to="/login" className="inline-flex items-center gap-1 font-semibold text-primary-400 hover:text-primary-300 transition-colors duration-300">
            <HiArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
