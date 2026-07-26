import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { courseAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi'

const ManageCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCourses = async () => {
    try {
      const { data } = await courseAPI.getAll()
      setCourses(data.courses || data || [])
    } catch (err) {
      toast.error('Failed to fetch courses')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCourses() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return
    try {
      await courseAPI.delete(id)
      setCourses(courses.filter((c) => c._id !== id))
      toast.success('Course deleted')
    } catch (err) {
      toast.error('Failed to delete course')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manage Courses</h1>
        <Link to="/admin/courses/add"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl text-sm hover:shadow-lg transition-all">
          <HiPlus className="w-4 h-4" /> Add Course
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Course</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Category</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Price</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Modules</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-48 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-16 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-8 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-20 animate-pulse"></div></td>
                  </tr>
                ))
              ) : courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course._id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-sm shrink-0">
                          {course.title?.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-800 text-sm">{course.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{course.category || '-'}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">₹{course.price}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{course.modules?.length || 0}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/courses/edit/${course._id}`}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                          <HiPencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(course._id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">No courses found. Create your first course!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageCourses
