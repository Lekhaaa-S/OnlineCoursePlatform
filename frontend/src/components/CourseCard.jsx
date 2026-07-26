import { Link } from 'react-router-dom'
import { HiUsers, HiBookOpen, HiArrowRight } from 'react-icons/hi'

const CourseCard = ({ course }) => {
  return (
    <Link to={`/courses/${course._id}`} className="group block bg-background-200 rounded-xl border border-background-300/30 overflow-hidden card-hover">
      <div className="relative overflow-hidden">
        <div className="h-44 bg-gradient-to-br from-primary-500/25 via-secondary-500/20 to-accent-500/10 flex items-center justify-center relative">
          <div className="absolute inset-0 dot-grid opacity-30"></div>
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
          ) : (
            <span className="relative text-5xl font-black text-text-950/10 group-hover:text-text-950/20 group-hover:scale-110 transition-all duration-500">{course.title?.charAt(0)}</span>
          )}
        </div>
        {course.category && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-background-200/95 backdrop-blur-sm text-xs font-semibold text-primary-400 rounded-md border border-primary-500/20 transition-all duration-300 group-hover:border-primary-500/40">
            {course.category}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-text-900 mb-1.5 group-hover:text-primary-400 transition-colors duration-300 line-clamp-1">
          {course.title}
        </h3>
        <p className="text-sm text-text-600 mb-4 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-text-500 mb-4">
          {course.instructor && (
            <span className="flex items-center gap-1"><HiUsers className="w-3.5 h-3.5" /> {course.instructor}</span>
          )}
          {course.modules && (
            <span className="flex items-center gap-1"><HiBookOpen className="w-3.5 h-3.5" /> {course.modules.length} modules</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-background-300/30">
          <span className="text-xl font-bold text-text-950">₹{course.price}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-400 group-hover:gap-2 transition-all duration-300">
            Enroll <HiArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
