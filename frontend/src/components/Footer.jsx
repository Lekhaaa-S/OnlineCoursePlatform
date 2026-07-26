import { HiAcademicCap, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <HiAcademicCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LearnHub</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering learners worldwide with industry-leading courses and hands-on projects.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="hover:text-primary transition-colors">All Courses</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">My Profile</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses?category=Web Development" className="hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link to="/courses?category=Data Science" className="hover:text-primary transition-colors">Data Science</Link></li>
              <li><Link to="/courses?category=Mobile Development" className="hover:text-primary transition-colors">Mobile Development</Link></li>
              <li><Link to="/courses?category=AI & ML" className="hover:text-primary transition-colors">AI & ML</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <HiMail className="w-4 h-4 text-primary" />
                support@learnhub.com
              </li>
              <li className="flex items-center gap-2">
                <HiPhone className="w-4 h-4 text-primary" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <HiLocationMarker className="w-4 h-4 text-primary" />
                India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} LearnHub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
