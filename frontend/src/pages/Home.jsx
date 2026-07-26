import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { courseAPI } from '../services/api'
import CourseCard from '../components/CourseCard'
import { HiArrowRight, HiAcademicCap, HiCog, HiClock, HiGlobe } from 'react-icons/hi'

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await courseAPI.getAll({ limit: 6 })
        setFeaturedCourses(data.courses || data || [])
      } catch (err) {
        console.error('Failed to fetch courses:', err)
      }
    }
    fetchCourses()
  }, [])

  const stats = [
    { icon: HiAcademicCap, label: 'Students', value: '10,000+' },
    { icon: HiCog, label: 'Courses', value: '50+' },
    { icon: HiClock, label: 'Hours of Content', value: '500+' },
    { icon: HiGlobe, label: 'Countries', value: '30+' },
  ]

  const categories = [
    { name: 'Web Development', color: 'from-blue-500 to-cyan-500', emoji: '🌐' },
    { name: 'Data Science', color: 'from-green-500 to-emerald-500', emoji: '📊' },
    { name: 'AI & ML', color: 'from-purple-500 to-violet-500', emoji: '🤖' },
    { name: 'Mobile Development', color: 'from-orange-500 to-red-500', emoji: '📱' },
    { name: 'Cloud & DevOps', color: 'from-indigo-500 to-blue-500', emoji: '☁️' },
    { name: 'Cyber Security', color: 'from-rose-500 to-pink-500', emoji: '🔐' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary-light text-sm font-medium rounded-full mb-6">
              Launch Your Tech Career
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Learn skills that{' '}
              <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                matter today
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
              Join thousands of learners mastering in-demand tech skills through hands-on courses built by industry experts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
                Explore Courses <HiArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:bg-white/5 transition-all">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Browse by Category</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Choose from a wide range of courses across multiple domains</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link key={i} to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="group p-6 bg-white rounded-2xl border border-slate-200/60 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span className="text-3xl block mb-3">{cat.emoji}</span>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-3">Featured Courses</h2>
              <p className="text-slate-500">Hand-picked courses to boost your career</p>
            </div>
            <Link to="/courses" className="hidden md:inline-flex items-center gap-1 text-primary font-semibold hover:text-primary-dark transition-colors">
              View All <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {featuredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <p className="text-lg">No courses available yet. Check back soon!</p>
            </div>
          )}
          <div className="text-center mt-8 md:hidden">
            <Link to="/courses" className="inline-flex items-center gap-1 text-primary font-semibold">
              View All Courses <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-white/80 mb-8">Join our community of learners and unlock your potential today.</p>
          <Link to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:shadow-xl transition-all duration-300">
            Get Started for Free <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
