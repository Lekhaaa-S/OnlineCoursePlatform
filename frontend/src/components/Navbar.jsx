import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { HiMenu, HiX, HiSearch, HiUser, HiLogout, HiAcademicCap } from 'react-icons/hi'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileOpen(false)
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-lg' : 'bg-background-100/95 backdrop-blur-sm border-b border-background-300/20'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-glow-primary group-hover:scale-105">
              <HiAcademicCap className="w-5 h-5 text-text-950" />
            </div>
            <span className="text-lg font-extrabold text-text-950 tracking-tight">LearnHub</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full group">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-background-600 group-focus-within:text-primary-400 transition-colors duration-300" />
              <input type="text" placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background-200/60 border border-background-300/40 rounded-lg text-sm text-text-950 placeholder:text-background-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 focus:bg-background-200 transition-all duration-300" />
            </div>
          </form>

          <div className="hidden md:flex items-center gap-1">
            <ThemeToggle />
            <Link to="/courses" className="px-3 py-2 text-sm font-medium text-text-700 hover:text-text-950 rounded-lg hover:bg-background-200/60 transition-all duration-300">
              Courses
            </Link>
            {isAuthenticated ? (
              <>
                {user?.role === 'user' && (
                  <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-text-700 hover:text-text-950 rounded-lg hover:bg-background-200/60 transition-all duration-300">
                    Dashboard
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link to="/admin" className="px-3 py-2 text-sm font-medium text-accent-400 hover:text-accent-300 rounded-lg hover:bg-accent-500/10 transition-all duration-300">
                    Admin
                  </Link>
                )}
                <div className="relative group ml-2">
                  <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-lg hover:bg-background-200/60 transition-all duration-300">
                    <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-text-950 text-sm font-bold transition-all duration-300 group-hover:shadow-glow-primary">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-text-700">{user?.name?.split(' ')[0]}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-52 bg-background-200 border border-background-300/40 rounded-xl shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 scale-95 group-hover:scale-100 origin-top-right">
                    <div className="px-4 py-2.5 border-b border-background-300/30">
                      <p className="text-sm font-semibold text-text-900">{user?.name}</p>
                      <p className="text-xs text-text-600">{user?.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-700 hover:bg-background-300/30 hover:text-text-950 transition-all duration-200">
                      <HiUser className="w-4 h-4" /> Profile
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary-400 hover:bg-primary-500/10 w-full transition-all duration-200">
                      <HiLogout className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 text-sm font-medium text-text-700 hover:text-text-950 rounded-lg hover:bg-background-200/60 transition-all duration-300">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm px-4 py-2">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-text-700 rounded-lg hover:bg-background-200/60 transition-all duration-300 active:scale-95">
            {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-background-100 border-t border-background-300/20 py-3 px-4 space-y-1">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-background-600" />
              <input type="text" placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background-200/60 border border-background-300/40 rounded-lg text-sm text-text-950 placeholder:text-background-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-300" />
            </div>
          </form>
          <Link to="/courses" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-text-700 hover:text-text-950 hover:bg-background-200/60 rounded-lg transition-all duration-300">Courses</Link>
          <div className="px-3 py-2 flex items-center justify-between">
            <span className="text-sm font-medium text-text-700">Theme</span>
            <ThemeToggle />
          </div>
          {isAuthenticated ? (
            <>
              {user?.role === 'user' && <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-text-700 hover:text-text-950 hover:bg-background-200/60 rounded-lg transition-all duration-300">Dashboard</Link>}
              {user?.role === 'admin' && <Link to="/admin" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-accent-400 hover:bg-accent-500/10 rounded-lg transition-all duration-300">Admin</Link>}
              <Link to="/profile" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-text-700 hover:text-text-950 hover:bg-background-200/60 rounded-lg transition-all duration-300">Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2.5 text-sm font-medium text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-text-700 hover:text-text-950 hover:bg-background-200/60 rounded-lg transition-all duration-300">Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-center text-text-950 bg-primary-500 rounded-lg transition-all duration-300 hover:bg-primary-600">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
