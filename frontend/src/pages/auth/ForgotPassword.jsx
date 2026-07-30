import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { HiArrowLeft } from 'react-icons/hi'

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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-background-50">
      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-950 mb-1">Reset Password</h1>
          <p className="text-sm text-text-700">We'll send you a reset link</p>
        </div>

        <div className="bg-background-200 rounded-xl border border-background-300/30 p-7 shadow-card">
          {sent ? (
            <div className="text-center py-6 animate-scale-in">
              <h3 className="text-lg font-semibold text-text-950 mb-1">Check your email</h3>
              <p className="text-sm text-text-600">Sent to <strong className="text-text-800">{email}</strong></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-700 mb-1.5">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
                  className="input-field" />
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full">
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
