import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { courseAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { HiPlusCircle, HiTrash } from 'react-icons/hi'

const EditCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', instructor: '', thumbnail: '' })
  const [modules, setModules] = useState([])

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await courseAPI.getById(id)
        setForm({
          title: data.title || '', description: data.description || '',
          price: data.price || '', category: data.category || '',
          instructor: data.instructor || '', thumbnail: data.thumbnail || '',
        })
        setModules(data.modules || [])
      } catch (err) {
        toast.error('Course not found')
        navigate('/admin/courses')
      } finally {
        setFetching(false)
      }
    }
    fetchCourse()
  }, [id, navigate])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const addModule = () => setModules([...modules, { title: '', lessons: [{ title: '', videoUrl: '', description: '' }] }])
  const removeModule = (i) => setModules(modules.filter((_, idx) => idx !== i))
  const updateModuleTitle = (i, value) => { const u = [...modules]; u[i].title = value; setModules(u) }
  const addLesson = (mi) => { const u = [...modules]; u[mi].lessons.push({ title: '', videoUrl: '', description: '' }); setModules(u) }
  const removeLesson = (mi, li) => { const u = [...modules]; u[mi].lessons = u[mi].lessons.filter((_, idx) => idx !== li); setModules(u) }
  const updateLesson = (mi, li, field, value) => { const u = [...modules]; u[mi].lessons[li][field] = value; setModules(u) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await courseAPI.update(id, { ...form, price: Number(form.price), modules })
      toast.success('Course updated!')
      navigate('/admin/courses')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update course')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Course Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input name="title" value={form.title} onChange={handleChange} required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
                <option value="">Select</option>
                <option>Web Development</option><option>Data Science</option><option>AI & ML</option>
                <option>Mobile Development</option><option>Cloud & DevOps</option><option>Cyber Security</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Instructor</label>
              <input name="instructor" value={form.instructor} onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows="3"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Thumbnail URL</label>
            <input name="thumbnail" value={form.thumbnail} onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Modules & Lessons</h2>
            <button type="button" onClick={addModule}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-all">
              <HiPlusCircle className="w-3.5 h-3.5" /> Add Module
            </button>
          </div>
          {modules.map((mod, mi) => (
            <div key={mi} className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-200/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">M{mi + 1}</span>
                <input value={mod.title} onChange={(e) => updateModuleTitle(mi, e.target.value)} required
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                {modules.length > 1 && (
                  <button type="button" onClick={() => removeModule(mi)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <HiTrash className="w-4 h-4" />
                  </button>
                )}
              </div>
              {mod.lessons?.map((lesson, li) => (
                <div key={li} className="flex items-start gap-2 ml-6">
                  <span className="text-xs text-slate-400 mt-2.5">L{li + 1}</span>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input value={lesson.title} onChange={(e) => updateLesson(mi, li, 'title', e.target.value)} required
                      className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                    <input value={lesson.videoUrl} onChange={(e) => updateLesson(mi, li, 'videoUrl', e.target.value)} placeholder="Video URL"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                  </div>
                  {mod.lessons.length > 1 && (
                    <button type="button" onClick={() => removeLesson(mi, li)} className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg mt-1">
                      <HiTrash className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => addLesson(mi)} className="ml-6 text-xs font-medium text-primary hover:text-primary-dark">+ Add Lesson</button>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-60">
            {loading ? 'Updating...' : 'Update Course'}
          </button>
          <button type="button" onClick={() => navigate('/admin/courses')}
            className="px-8 py-3 border border-slate-300 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCourse
