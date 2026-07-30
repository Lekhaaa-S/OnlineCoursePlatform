import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { courseAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { HiPencilAlt, HiTrash, HiSearch, HiPlus } from 'react-icons/hi'

const ManageCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const { data } = await courseAPI.getAll()
      setCourses(data.courses || data || [])
    } catch { toast.error('Failed to load courses') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchCourses() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this course?')) return
    try {
      await courseAPI.delete(id)
      setCourses(courses.filter((c) => c._id !== id))
      toast.success('Course deleted')
    } catch { toast.error('Delete failed') }
  }

  const filtered = courses.filter((c) => c.title?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-text-950">Manage Courses</h1>
        <Link to="/admin/courses/new" className="btn-primary flex items-center gap-1.5 text-sm">
          <HiPlus className="w-4 h-4" /> Add Course
        </Link>
      </div>

      <div className="bg-background-200 rounded-xl border border-background-300/30 overflow-hidden">
        <div className="p-4 border-b border-background-300/20">
          <div className="relative max-w-xs group">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-500 group-focus-within:text-primary-400 transition-colors duration-300" />
            <input type="text" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-background-300/20">
              <th className="text-left px-5 py-3 font-semibold text-text-500 text-xs uppercase tracking-wider">Course</th>
              <th className="text-left px-5 py-3 font-semibold text-text-500 text-xs uppercase tracking-wider">Price</th>
              <th className="text-left px-5 py-3 font-semibold text-text-500 text-xs uppercase tracking-wider">Category</th>
              <th className="text-right px-5 py-3 font-semibold text-text-500 text-xs uppercase tracking-wider">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-background-300/15">
              {loading ? (
                <tr><td colSpan="4" className="px-5 py-10 text-center text-text-500">Loading...</td></tr>
              ) : filtered.length > 0 ? filtered.map((course) => (
                <tr key={course._id} className="hover:bg-background-300/10 transition-colors duration-200">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-text-900">{course.title}</div>
                    {course.instructor && <div className="text-xs text-text-500">{course.instructor}</div>}
                  </td>
                  <td className="px-5 py-3.5 text-text-700 font-medium">₹{course.price}</td>
                  <td className="px-5 py-3.5">
                    {course.category && <span className="px-2 py-0.5 bg-background-300/30 text-text-600 text-xs rounded-md">{course.category}</span>}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/admin/courses/${course._id}/edit`}
                        className="p-1.5 text-text-500 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-300">
                        <HiPencilAlt className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(course._id)}
                        className="p-1.5 text-text-500 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-300">
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="px-5 py-10 text-center text-text-500">No courses found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageCourses
