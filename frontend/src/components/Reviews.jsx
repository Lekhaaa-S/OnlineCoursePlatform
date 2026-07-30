import { useState, useEffect } from 'react'
import { reviewAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { HiStar, HiOutlineStar } from 'react-icons/hi'

const StarRating = ({ value, onChange, readonly }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button key={star} type="button" onClick={() => !readonly && onChange(star)} disabled={readonly}
        className={`${readonly ? '' : 'cursor-pointer hover:scale-110'} transition-transform duration-150`}>
        {star <= value ? <HiStar className="w-5 h-5 text-accent-500" /> : <HiOutlineStar className="w-5 h-5 text-text-600" />}
      </button>
    ))}
  </div>
)

const Reviews = ({ courseId }) => {
  const { user, isAuthenticated } = useAuth()
  const [reviews, setReviews] = useState([])
  const [avgRating, setAvgRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [userReview, setUserReview] = useState(null)

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const { data } = await reviewAPI.getCourseReviews(courseId)
      setReviews(data.reviews || [])
      setAvgRating(data.averageRating || 0)
      setTotalReviews(data.totalReviews || 0)
      const mine = data.reviews?.find((r) => r.user?._id === user?._id || r.user === user?._id)
      if (mine) setUserReview(mine)
    } catch { /* silent */ }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchReviews() }, [courseId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!rating) { toast.error('Please select a rating'); return }
    if (!comment.trim()) { toast.error('Please write a review'); return }
    setSubmitting(true)
    try {
      await reviewAPI.create({ courseId, rating, comment })
      toast.success('Review submitted!')
      setRating(0); setComment('')
      fetchReviews()
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to submit review') }
    finally { setSubmitting(false) }
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-text-950">Student Reviews</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <HiStar key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? 'text-accent-500' : 'text-text-600'}`} />
              ))}
            </div>
            <span className="text-sm font-semibold text-text-900">{avgRating.toFixed(1)}</span>
            <span className="text-sm text-text-600">({totalReviews} review{totalReviews !== 1 && 's'})</span>
          </div>
        </div>
      </div>

      {isAuthenticated && !userReview && (
        <form onSubmit={handleSubmit} className="bg-background-200 rounded-xl border border-background-300/30 p-5 mb-8">
          <h3 className="text-sm font-semibold text-text-900 mb-3">Write a Review</h3>
          <div className="mb-3">
            <StarRating value={rating} onChange={setRating} />
          </div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="3" placeholder="Share your experience..."
            className="w-full px-4 py-2.5 bg-background-50 border border-background-300/50 rounded-lg text-sm text-text-950 placeholder:text-text-600 focus:outline-none focus:ring-1 focus:ring-primary-500/50 focus:border-primary-500/50 resize-none transition-all mb-3" />
          <button type="submit" disabled={submitting}
            className="px-5 py-2 bg-primary-500 text-text-950 font-semibold rounded-lg text-sm hover:bg-primary-600 transition-all disabled:opacity-60">
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      {isAuthenticated && userReview && (
        <div className="bg-accent-500/5 rounded-xl border border-accent-500/15 p-4 mb-8 flex items-center gap-3 text-sm">
          <HiStar className="w-5 h-5 text-accent-500 shrink-0" />
          <span className="text-text-700">You reviewed this course <strong className="text-text-900">{userReview.rating}/5</strong>. Only one review per user.</span>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">{[1, 2].map((i) => <div key={i} className="h-20 bg-background-200 animate-pulse rounded-xl"></div>)}</div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={r._id || i} className="bg-background-200 rounded-xl border border-background-300/30 p-5 animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-500/20 text-primary-400 rounded-lg flex items-center justify-center text-xs font-bold">{r.user?.name?.charAt(0)?.toUpperCase() || '?'}</div>
                  <div>
                    <p className="text-sm font-semibold text-text-900">{r.user?.name || 'Anonymous'}</p>
                    <p className="text-xs text-text-600">{formatDate(r.createdAt)}</p>
                  </div>
                </div>
                <StarRating value={r.rating} readonly />
              </div>
              {r.comment && <p className="text-sm text-text-700 ml-11 leading-relaxed">{r.comment}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-14 bg-background-200 rounded-xl border border-background-300/30">
          <p className="text-sm text-text-600">No reviews yet. Be the first!</p>
        </div>
      )}
    </div>
  )
}

export default Reviews
