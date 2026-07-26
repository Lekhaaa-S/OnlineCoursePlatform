import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { courseAPI, enrollmentAPI } from '../services/api'
import { HiArrowLeft, HiCheckCircle, HiPlay } from 'react-icons/hi'

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
        const [courseRes, progressRes] = await Promise.all([
          courseAPI.getById(id),
          enrollmentAPI.getProgress(id).catch(() => ({ data: { completedLessons: [], percentage: 0 } })),
        ])
        setCourse(courseRes.data)
        setProgress(progressRes.data)
      } catch (err) {
        console.error('Failed to load course:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const isLessonCompleted = (moduleIdx, lessonIdx) => {
    return progress.completedLessons?.some(
      (l) => l.moduleIndex === moduleIdx && l.lessonIndex === lessonIdx
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!course) return null

  const currentModule = course.modules?.[activeModule]
  const currentLesson = currentModule?.lessons?.[activeLesson]

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-slate-300 hover:text-white text-sm transition-colors">
            <HiArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <span className="text-sm text-slate-400">{course.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        <div className="flex-1 min-w-0">
          <div className="bg-black aspect-video flex items-center justify-center">
            {currentLesson?.videoUrl ? (
              <div className="w-full h-full flex items-center justify-center text-white">Video Player - {currentLesson.title}</div>
            ) : (
              <div className="text-center text-slate-500">
                <HiPlay className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p>Select a lesson to start watching</p>
              </div>
            )}
          </div>
          {currentLesson && (
            <div className="bg-slate-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-2">{currentLesson.title}</h2>
              {currentLesson.description && (
                <p className="text-slate-400">{currentLesson.description}</p>
              )}
            </div>
          )}
        </div>

        <div className="w-80 bg-slate-800 border-l border-slate-700 max-h-[calc(100vh-4rem)] overflow-y-auto hidden md:block">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold mb-2">Course Content</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${progress.percentage || 0}%` }}></div>
              </div>
              <span className="text-xs text-slate-400">{progress.percentage || 0}%</span>
            </div>
          </div>
          <div className="p-2">
            {course.modules?.map((mod, mi) => (
              <div key={mi} className="mb-2">
                <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Module {mi + 1}: {mod.title}
                </div>
                {mod.lessons?.map((lesson, li) => (
                  <button
                    key={li}
                    onClick={() => { setActiveModule(mi); setActiveLesson(li) }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all ${
                      activeModule === mi && activeLesson === li
                        ? 'bg-primary/20 text-white'
                        : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {isLessonCompleted(mi, li) ? (
                      <HiCheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    ) : (
                      <HiPlay className="w-4 h-4 shrink-0" />
                    )}
                    <span className="truncate">{lesson.title || lesson.name || `Lesson ${li + 1}`}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseLearn
