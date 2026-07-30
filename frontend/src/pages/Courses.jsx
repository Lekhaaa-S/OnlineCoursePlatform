import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { courseAPI } from '../services/api'
import CourseCard from '../components/CourseCard'
import { HiSearch, HiFilter } from 'react-icons/hi'

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState('')

  const categories = ['Web Development', 'Data Science', 'AI & ML', 'Mobile Development', 'Cloud & DevOps', 'Cyber Security']

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const params = {}
        if (search) params.search = search
        if (category) params.category = category
        if (sortBy) params.sort = sortBy
        const { data } = await courseAPI.getAll(params)
        setCourses(data.courses || data || [])
      } catch (err) {
        console.error('Failed to fetch courses:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [search, category, sortBy])

  const handleSearch = (e) => {
    e.preventDefault()
    const newParams = new URLSearchParams(searchParams)
    if (search) newParams.set('search', search)
    else newParams.delete('search')
    setSearchParams(newParams)
  }

  return (
    <div className="min-h-screen bg-background-50">
      <div className="bg-background-100/50 py-10 border-b border-background-300/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="eyebrow mb-3 animate-slide-up">{courses.length || ''} courses live now</span>
          <h1 className="text-3xl font-bold text-text-950 mb-6 animate-slide-up">All Courses</h1>
          <div className="flex flex-col md:flex-row gap-3 animate-slide-up delay-100">
            <form onSubmit={handleSearch} className="flex-1 relative group">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-background-600 group-focus-within:text-primary-400 transition-colors duration-300" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..."
                className="input-field pl-10" />
            </form>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="input-field w-auto md:w-48 appearance-none cursor-pointer">
              <option value="">All Categories</option>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="input-field w-auto md:w-44 appearance-none cursor-pointer">
              <option value="">Sort By</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!loading && <p className="text-sm text-text-600 mb-5">{courses.length} course{courses.length !== 1 ? 's' : ''} found</p>}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-background-200 rounded-xl border border-background-300/30 overflow-hidden animate-pulse">
                <div className="h-44 bg-background-300/30"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-background-300/40 rounded w-3/4"></div>
                  <div className="h-4 bg-background-300/20 rounded w-full"></div>
                  <div className="h-4 bg-background-300/20 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course, i) => (
              <div key={course._id} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <HiFilter className="w-10 h-10 text-text-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-text-700 mb-1">No courses found</h3>
            <p className="text-sm text-text-500">Try different search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses
