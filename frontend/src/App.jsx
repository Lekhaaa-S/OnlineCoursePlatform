import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Dashboard from './pages/Dashboard'
import CourseLearn from './pages/CourseLearn'
import Profile from './pages/Profile'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageCourses from './pages/admin/ManageCourses'
import AddCourse from './pages/admin/AddCourse'
import EditCourse from './pages/admin/EditCourse'
import ManageUsers from './pages/admin/ManageUsers'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Routes>
        {/* Auth pages - no navbar/footer */}
        <Route path="/login" element={<><Navbar /><div className="flex-1"><Login /></div><Footer /></>} />
        <Route path="/register" element={<><Navbar /><div className="flex-1"><Register /></div><Footer /></>} />
        <Route path="/forgot-password" element={<><Navbar /><div className="flex-1"><ForgotPassword /></div><Footer /></>} />

        {/* Admin layout - no public footer */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="courses/add" element={<AddCourse />} />
          <Route path="courses/edit/:id" element={<EditCourse />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>

        {/* Course learning - minimal layout */}
        <Route path="/learn/:id" element={<ProtectedRoute><CourseLearn /></ProtectedRoute>} />

        {/* Public pages with navbar + footer */}
        <Route path="*" element={
          <>
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              </Routes>
            </div>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
