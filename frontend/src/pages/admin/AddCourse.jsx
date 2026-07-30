import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { courseAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { HiPlus, HiX } from 'react-icons/hi'

const AddCourse = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', description: '', price: '', instructor: '', category: '', thumbnail: '',
  })
  const [modules, setModules] = useState([{ title: '', lessons: [{ title: '', videoUrl: '', duration: '' }] }])
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleModuleChange = (mi, e) => {
    const updated = [...modules]; updated[mi].title = e.target.value; setModules(updated)
  }
  const handleLessonChange = (mi, li, e) => {
    const updated = [...modules]; updated[mi].lessons[li][e.target.name] = e.target.value; setModules(updated)
  }
  const addModule = () => setModules([...modules, { title: '', lessons: [{ title: '', videoUrl: '', duration: '' }] }])
  const removeModule = (mi) => setModules(modules.filter((_, i) => i !== mi))
  const addLesson = (mi) => {
    const updated = [...modules]; updated[mi].lessons.push({ title: '', videoUrl: '', duration: '' }); setModules(updated)
  }
  const removeLesson = (mi, li) => {
    const updated = [...modules]; updated[mi].lessons = updated[mi].lessons.filter((_, i) => i !== li); setModules(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.price) { toast.error('Title and price are required'); return }
    setLoading(true)
    try {
      await courseAPI.create({ ...form, price: Number(form.price), modules })
      toast.success('Course created!')
      navigate('/admin/courses')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create course')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-3xl animate-slide-up">
      <h1 className="text-xl font-bold text-text-950 mb-6">Add New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-background-200 rounded-xl border border-background-300/30 p-6 space-y-4">
          <h3 className="text-xs font-bold text-text-500 uppercase tracking-wider">Basic Info</h3>
          {[
            { name: 'title', label: 'Title', placeholder: 'e.g. Full Stack Web Development', required: true },
            { name: 'instructor', label: 'Instructor', placeholder: 'e.g. John Doe' },
            { name: 'category', label: 'Category', placeholder: 'e.g. Web Development' },
            { name: 'price', label: 'Price (₹)', placeholder: 'e.g. 1999', type: 'number', required: true },
            { name: 'thumbnail', label: 'Thumbnail URL', placeholder: 'https://...' },
          ].map((field) => (
            <div key={field.name} className="group">
              <label className="block text-sm font-medium text-text-700 mb-1.5">{field.label}</label>
              <input type={field.type || 'text'} name={field.name} value={form[field.name]} onChange={handleChange} required={field.required} placeholder={field.placeholder}
                className="input-field" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-text-700 mb-1.5">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Course description..."
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
            <div key={mi} className="bg-background-200 rounded-xl border border-background-300/30 p-5 relative transition-all duration-300 hover:border-background-300/50">
              <div className="flex items-center gap-2 mb-3">
                <input type="text" value={mod.title} onChange={(e) => handleModuleChange(mi, e)} placeholder="Module title..."
                  className="input-field flex-1" />
                {modules.length > 1 && (
                  <button type="button" onClick={() => removeModule(mi)} className="p-1.5 text-text-500 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-300">
                    <HiX className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="space-y-2 pl-4 border-l-2 border-background-300/30">
                {mod.lessons.map((lesson, li) => (
                  <div key={li} className="flex items-center gap-2">
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <input type="text" name="title" value={lesson.title} onChange={(e) => handleLessonChange(mi, li, e)} placeholder="Lesson title..."
                        className="input-field text-xs px-3 py-1.5" />
                      <input type="text" name="videoUrl" value={lesson.videoUrl} onChange={(e) => handleLessonChange(mi, li, e)} placeholder="Video URL"
                        className="input-field text-xs px-3 py-1.5" />
                      <input type="text" name="duration" value={lesson.duration} onChange={(e) => handleLessonChange(mi, li, e)} placeholder="Duration (e.g. 10:30)"
                        className="input-field text-xs px-3 py-1.5" />
                    </div>
                    {mod.lessons.length > 1 && (
                      <button type="button" onClick={() => removeLesson(mi, li)} className="p-1 text-text-500 hover:text-primary-400 transition-colors duration-300">
                        <HiX className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addLesson(mi)}
                className="mt-3 flex items-center gap-1 text-xs text-text-500 hover:text-accent-400 font-medium transition-colors duration-300">
                <HiPlus className="w-3 h-3" /> Add Lesson
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="btn-primary active:scale-95">
            {loading ? 'Creating...' : 'Create Course'}
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

export default AddCourse
