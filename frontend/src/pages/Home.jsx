import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { courseAPI } from '../services/api'
import CourseCard from '../components/CourseCard'
import {
  HiArrowRight, HiAcademicCap, HiSparkles, HiPlay, HiCheckCircle,
  HiGlobeAlt, HiChip, HiDeviceMobile, HiCloud, HiShieldCheck, HiChartBar,
} from 'react-icons/hi'

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

  const categories = [
    { name: 'Web Development', icon: HiGlobeAlt },
    { name: 'Data Science', icon: HiChartBar },
    { name: 'AI & ML', icon: HiChip },
    { name: 'Mobile Dev', icon: HiDeviceMobile },
    { name: 'Cloud & DevOps', icon: HiCloud },
    { name: 'Cyber Security', icon: HiShieldCheck },
  ]

  const stats = [
    { value: '12K+', label: 'Students learning right now' },
    { value: '180+', label: 'Project-based courses' },
    { value: '96%', label: 'Would recommend a course' },
    { value: '4.8/5', label: 'Average course rating' },
  ]

  return (
    <div className="bg-background-50 overflow-x-hidden">
      {/* Hero */}
      <section className="border-b border-background-300/20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div className="animate-slide-up">
              <span className="eyebrow mb-6">
                <HiSparkles className="w-3.5 h-3.5" /> New cohorts open every month
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-text-950 leading-[1.05] tracking-tight mb-6">
                Learn skills
                <br />
                that actually <span className="text-gradient-accent">ship.</span>
              </h1>
              <p className="text-lg text-text-600 mb-9 max-w-md leading-relaxed">
                Project-based courses built by industry practitioners. No fluff,
                no filler videos — just the exact path from zero to shipped.
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                <Link to="/courses" className="btn-primary inline-flex items-center gap-2 text-sm">
                  Browse Courses <HiArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/register" className="btn-secondary inline-flex items-center gap-2 text-sm">
                  Create Account
                </Link>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {['A', 'S', 'R', 'K'].map((l, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-secondary-500 border-2 border-background-50 flex items-center justify-center text-xs font-bold text-text-950">
                      {l}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-text-600">
                  <span className="text-text-950 font-semibold">12,000+</span> learners already building
                </p>
              </div>
            </div>

            {/* Right: floating course-preview mockup — signature element.
                Each piece owns its own column so nothing overlaps another's text. */}
            <div className="relative h-[440px] hidden lg:block animate-scale-in">
              {/* top-right: video card */}
              <div className="absolute top-0 right-2 w-64 gradient-border rounded-2xl shadow-card p-4 animate-card-tilt" style={{ '--rot': '2deg', '--tilt': '-4deg' }}>
                <div className="h-32 rounded-xl bg-gradient-to-br from-primary-500/45 to-secondary-500/45 flex items-center justify-center mb-3">
                  <div className="w-11 h-11 rounded-full bg-text-950/95 flex items-center justify-center">
                    <HiPlay className="w-5 h-5 text-primary-600 ml-0.5" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-text-950 mb-2 truncate">Building APIs with FastAPI</p>
                <div className="h-1.5 rounded-full bg-background-300/50 overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-accent-500"></div>
                </div>
              </div>

              {/* middle-left: stat badge, well clear of both cards horizontally */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-40 h-40 rounded-2xl bg-background-200/95 border border-background-300/40 flex flex-col items-center justify-center gap-1.5 shadow-card animate-breathe">
                <HiAcademicCap className="w-8 h-8 text-primary-400" />
                <span className="text-2xl font-black text-text-950">180+</span>
                <span className="text-xs text-text-600">live courses</span>
              </div>

              {/* bottom-right: progress card, clear of the top card vertically */}
              <div className="absolute bottom-0 right-6 w-60 gradient-border rounded-2xl shadow-card p-4 animate-card-tilt" style={{ '--rot': '-1deg', '--tilt': '5deg', animationDelay: '1.2s' }}>
                <div className="flex items-center gap-2 mb-2">
                  <HiCheckCircle className="w-5 h-5 text-accent-500 shrink-0" />
                  <p className="text-sm font-semibold text-text-950">Module 4 complete</p>
                </div>
                <p className="text-xs text-text-600">React Query &amp; caching strategies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-14 bg-background-100/40 border-b border-background-300/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="p-5 rounded-xl bg-background-200/60 border border-background-300/30 animate-fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
                <p className="text-2xl md:text-3xl font-black text-text-950 mb-1">{s.value}</p>
                <p className="text-xs text-text-600 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-950 mb-1">Browse by category</h2>
            <p className="text-text-600 text-sm">Find courses in the area that interests you</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <Link key={i} to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="group p-5 bg-background-200 rounded-xl border border-background-300/30 text-center card-hover animate-scale-in"
                style={{ animationDelay: `${i * 0.04}s` }}>
                <cat.icon className="w-6 h-6 mx-auto mb-2.5 text-primary-400 group-hover:text-accent-400 group-hover:scale-110 transition-all duration-300" />
                <span className="text-sm font-medium text-text-600 group-hover:text-text-950 transition-colors duration-300">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-background-100/40 border-y border-background-300/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-950 mb-1">Featured courses</h2>
              <p className="text-text-600 text-sm">Start learning today</p>
            </div>
            <Link to="/courses" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors duration-300 group">
              View All <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          {featuredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredCourses.map((course, i) => (
                <div key={course._id} className="animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-background-200 rounded-xl border border-background-300/30">
              <HiAcademicCap className="w-10 h-10 text-text-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-text-700 mb-1">No courses yet</h3>
              <p className="text-sm text-text-500">Courses will appear here once published.</p>
            </div>
          )}
          <div className="text-center mt-8 md:hidden">
            <Link to="/courses" className="text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors duration-300">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-text-950 mb-2">How it works</h2>
            <p className="text-text-600 text-sm">Three steps between you and a shipped project.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-primary-500/40 via-secondary-500/40 to-accent-500/40"></div>
            {[
              { num: '01', title: 'Choose', desc: 'Browse courses and pick what you want to learn.' },
              { num: '02', title: 'Enroll', desc: 'Pay once via Stripe. Lifetime access, no subscriptions.' },
              { num: '03', title: 'Learn', desc: 'Watch lessons, track progress, and build real projects.' },
            ].map((item, i) => (
              <div key={i} className="relative p-6 bg-background-200 rounded-xl border border-background-300/30 card-hover group hover:border-primary-500/20">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-500/15 text-primary-400 font-bold text-sm mb-4 group-hover:bg-primary-500/25 transition-colors duration-300">
                  {item.num}
                </span>
                <h3 className="text-lg font-bold text-text-950 mb-1.5">{item.title}</h3>
                <p className="text-sm text-text-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="rounded-2xl p-12 text-center border border-background-300/30 bg-background-200">
            <h2 className="text-3xl font-bold text-text-950 mb-3">Ready to start?</h2>
            <p className="text-text-600 mb-8 max-w-md mx-auto">Create a free account and explore our course catalog.</p>
            <Link to="/register" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
              Get Started <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
