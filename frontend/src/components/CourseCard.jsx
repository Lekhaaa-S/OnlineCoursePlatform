import { Link } from 'react-router-dom'
import { HiStar, HiUsers, HiClock } from 'react-icons/hi'

const CourseCard = ({ course }) => {
  return (
    <Link
      to={`/courses/${course._id}`}
      className="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <span className="text-4xl font-bold text-primary/20">{course.title?.charAt(0)}</span>
          )}
        </div>
        {course.category && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary rounded-full">
            {course.category}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-slate-800 text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {course.title}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
          {course.instructor && (
            <span className="flex items-center gap-1">
              <HiUsers className="w-3.5 h-3.5" />
              {course.instructor}
            </span>
          )}
          {course.modules && (
            <span className="flex items-center gap-1">
              <HiClock className="w-3.5 h-3.5" />
              {course.modules.length} modules
            </span>
          )}
          <span className="flex items-center gap-1">
            <HiStar className="w-3.5 h-3.5 text-amber-400" />
            4.8
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xl font-bold text-primary">
            ₹{course.price}
          </span>
          <span className="text-xs font-medium text-white bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-lg group-hover:shadow-lg group-hover:shadow-primary/25 transition-all">
            Enroll Now
          </span>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
