import { HiAcademicCap, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-background-100 border-t border-background-300/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <HiAcademicCap className="w-5 h-5 text-text-950" />
              </div>
              <span className="text-lg font-extrabold text-text-950 tracking-tight">LearnHub</span>
            </Link>
            <p className="text-sm leading-relaxed text-text-600">
              Learn skills that matter. Built for developers, by developers.
            </p>
          </div>

          <div>
            <h4 className="text-text-900 font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/courses" className="text-text-600 hover:text-text-950 transition-colors duration-300">All Courses</Link></li>
              <li><Link to="/dashboard" className="text-text-600 hover:text-text-950 transition-colors duration-300">Dashboard</Link></li>
              <li><Link to="/profile" className="text-text-600 hover:text-text-950 transition-colors duration-300">Profile</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-900 font-semibold text-sm mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/courses?category=Web Development" className="text-text-600 hover:text-text-950 transition-colors duration-300">Web Development</Link></li>
              <li><Link to="/courses?category=Data Science" className="text-text-600 hover:text-text-950 transition-colors duration-300">Data Science</Link></li>
              <li><Link to="/courses?category=Mobile Development" className="text-text-600 hover:text-text-950 transition-colors duration-300">Mobile Dev</Link></li>
              <li><Link to="/courses?category=AI & ML" className="text-text-600 hover:text-text-950 transition-colors duration-300">AI & ML</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-900 font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-text-600"><HiMail className="w-4 h-4 text-primary-400" /> support@learnhub.com</li>
              <li className="flex items-center gap-2 text-text-600"><HiPhone className="w-4 h-4 text-primary-400" /> +91 98765 43210</li>
              <li className="flex items-center gap-2 text-text-600"><HiLocationMarker className="w-4 h-4 text-primary-400" /> India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background-300/20 mt-10 pt-6 text-center text-sm text-text-600">
          &copy; {new Date().getFullYear()} LearnHub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
