import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { courseAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { HiPlus, HiX } from 'react-icons/hi'

const EditCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '', price: '', instructor: '', category: '', thumbnail: '' })
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await courseAPI.getById(id)
        setForm({
          title: data.title || '', description: data.description || '',
          price: data.price || '', instructor: data.instructor || '',
          category: data.category || '', thumbnail: data.thumbnail || '',
        })
        setModules(data.modules?.length > 0 ? data.modules : [{ title: '', lessons: [{ title: '', videoUrl: '', duration: '' }] }])
      } catch { toast.error('Course not found'); navigate('/admin/courses') }
      finally { setFetching(false) }
    }
    fetch()
  }, [id, navigate])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleModuleChange = (mi, e) => { const u = [...modules]; u[mi].title = e.target.value; setModules(u) }
  const handleLessonChange = (mi, li, e) => { const u = [...modules]; u[mi].lessons[li][e.target.name] = e.target.value; setModules(u) }
  const addModule = () => setModules([...modules, { title: '', lessons: [{ title: '', videoUrl: '', duration: '' }] }])
  const removeModule = (mi) => setModules(modules.filter((_, i) => i !== mi))
  const addLesson = (mi) => { const u = [...modules]; u[mi].lessons.push({ title: '', videoUrl: '', duration: '' }); setModules(u) }
  const removeLesson = (mi, li) => { const u = [...modules]; u[mi].lessons = u[mi].lessons.filter((_, i) => i !== li); setModules(u) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await courseAPI.update(id, { ...form, price: Number(form.price), modules })
      toast.success('Course updated!'); navigate('/admin/courses')
    } catch (err) { toast.error(err.response?.data?.message || 'Update failed') }
    finally { setLoading(false) }
  }

  if (fetching) return <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>

  return (
    <div className="max-w-3xl animate-slide-up">
      <h1 className="text-xl font-bold text-text-950 mb-6">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-background-200 rounded-xl border border-background-300/30 p-6 space-y-4">
          <h3 className="text-xs font-bold text-text-500 uppercase tracking-wider">Basic Info</h3>
          {[
            { name: 'title', label: 'Title', required: true },
            { name: 'instructor', label: 'Instructor' },
            { name: 'category', label: 'Category' },
            { name: 'price', label: 'Price (₹)', type: 'number', required: true },
            { name: 'thumbnail', label: 'Thumbnail URL' },
          ].map((f) => (
            <div key={f.name} className="group">
              <label className="block text-sm font-medium text-text-700 mb-1.5">{f.label}</label>
              <input type={f.type || 'text'} name={f.name} value={form[f.name]} onChange={handleChange} required={f.required}
                className="input-field" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-text-700 mb-1.5">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4"
              className="input-field resize-none" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-text-500 uppercase tracking-wider">Modules & Lessons</h3>
            <button type="button" onClick={addModule}
              className="flex items-center gap-1 px-3 py-1.5 bg-accent-500/10 text-accent-400 font-semibold rounded-lg text-xs hover:bg-accent-500/20 transition-all duration-300 active:scale-95">
              <HiPlus className="w-3 h-3" /> Add Module
            </button>
          </div>
          {modules.map((mod, mi) => (
            <div key={mi} className="bg-background-200 rounded-xl border border-background-300/30 p-5 transition-all duration-300 hover:border-background-300/50">
              <div className="flex items-center gap-2 mb-3">
                <input type="text" value={mod.title} onChange={(e) => handleModuleChange(mi, e)} placeholder="Module title..."
                  className="input-field flex-1" />
                {modules.length > 1 && <button type="button" onClick={() => removeModule(mi)} className="p-1.5 text-text-500 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-300"><HiX className="w-4 h-4" /></button>}
              </div>
              <div className="space-y-2 pl-4 border-l-2 border-background-300/30">
                {mod.lessons.map((lesson, li) => (
                  <div key={li} className="flex items-center gap-2">
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      {['title', 'videoUrl', 'duration'].map((field) => (
                        <input key={field} type="text" name={field} value={lesson[field]} onChange={(e) => handleLessonChange(mi, li, e)}
                          placeholder={field === 'title' ? 'Lesson title...' : field === 'videoUrl' ? 'Video URL' : 'Duration'}
                          className="input-field text-xs px-3 py-1.5" />
                      ))}
                    </div>
                    {mod.lessons.length > 1 && <button type="button" onClick={() => removeLesson(mi, li)} className="p-1 text-text-500 hover:text-primary-400 transition-colors duration-300"><HiX className="w-3 h-3" /></button>}
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addLesson(mi)} className="mt-3 flex items-center gap-1 text-xs text-text-500 hover:text-accent-400 font-medium transition-colors duration-300">
                <HiPlus className="w-3 h-3" /> Add Lesson
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="btn-primary active:scale-95">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate('/admin/courses')}
            className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCourse
