import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { courseAPI, enrollmentAPI } from '../services/api'
import { HiArrowLeft, HiCheckCircle, HiPlay, HiBookOpen } from 'react-icons/hi'

const CourseLearn = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [progress, setProgress] = useState({ completedLessons: [], percentage: 0 })
  const [activeModule, setActiveModule] = useState(0)
  const [activeLesson, setActiveLesson] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [c, p] = await Promise.all([
          courseAPI.getById(id),
          enrollmentAPI.getProgress(id).catch(() => ({ data: { completedLessons: [], percentage: 0 } })),
        ])
        setCourse(c.data)
        setProgress(p.data)
      } catch { console.error('Failed to load course') }
      finally { setLoading(false) }
    }
    fetchData()
  }, [id])

  const isDone = (mi, li) => progress.completedLessons?.some((l) => l.moduleIndex === mi && l.lessonIndex === li)

  if (loading) return <div className="min-h-screen bg-background-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>
  if (!course) return null

  const currentModule = course.modules?.[activeModule]
  const currentLesson = currentModule?.lessons?.[activeLesson]

  return (
    <div className="min-h-screen bg-background-50">
      <div className="bg-background-100 border-b border-background-300/20 px-4 py-2.5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-1.5 text-text-600 hover:text-text-950 text-sm transition-colors duration-300 group">
            <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" /> Dashboard
          </Link>
          <span className="text-sm text-text-500 truncate max-w-xs">{course.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        <div className="flex-1 min-w-0">
          <div className="bg-black aspect-video flex items-center justify-center">
            {currentLesson?.videoUrl ? (
              <div className="text-text-950 text-lg">Video Player</div>
            ) : (
              <div className="text-center">
                <HiPlay className="w-12 h-12 text-text-700/30 mx-auto mb-2" />
                <p className="text-sm text-text-500/50">Select a lesson to play</p>
              </div>
            )}
          </div>
          {currentLesson && (
            <div className="bg-background-100 p-6 border-b border-background-300/20">
              <h2 className="text-lg font-semibold text-text-950 mb-1">{currentLesson.title}</h2>
              {currentLesson.description && <p className="text-sm text-text-600">{currentLesson.description}</p>}
            </div>
          )}
        </div>

        <div className="w-72 bg-background-100 border-l border-background-300/20 max-h-[calc(100vh-2.5rem)] overflow-y-auto hidden md:block">
          <div className="p-4 border-b border-background-300/20">
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="text-text-500">Progress</span>
              <span className="text-text-950 font-medium">{progress.percentage || 0}%</span>
            </div>
            <div className="h-1.5 bg-background-300/30 rounded-full overflow-hidden">
              <div className="h-full bg-accent-500 rounded-full transition-all duration-500" style={{ width: `${progress.percentage || 0}%` }}></div>
            </div>
          </div>
          <div className="p-2">
            {course.modules?.map((mod, mi) => (
              <div key={mi} className="mb-2">
                <div className="px-3 py-1.5 flex items-center gap-1.5">
                  <HiBookOpen className="w-3 h-3 text-text-500" />
                  <span className="text-[11px] font-semibold text-text-500 uppercase tracking-wider">Module {mi + 1}: {mod.title}</span>
                </div>
                {mod.lessons?.map((lesson, li) => {
                  const active = activeModule === mi && activeLesson === li
                  const done = isDone(mi, li)
                  return (
                    <button key={li} onClick={() => { setActiveModule(mi); setActiveLesson(li) }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-all duration-200 ${
                        active ? 'bg-primary-500/15 text-text-950 border border-primary-500/20' : 'text-text-600 hover:bg-background-200/60 hover:text-text-900'
                      }`}>
                      {done ? <HiCheckCircle className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                        : active ? <div className="w-3.5 h-3.5 rounded-full bg-primary-500/30 flex items-center justify-center shrink-0"><div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div></div>
                        : <HiPlay className="w-3.5 h-3.5 shrink-0 opacity-40" />}
                      <span className="truncate text-xs">{lesson.title || lesson.name || `Lesson ${li + 1}`}</span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseLearn
