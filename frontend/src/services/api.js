import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
}

export const userAPI = {
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.put('/users/change-password', data),
  getAllUsers: () => api.get('/users/admin/users'),
  getStats: () => api.get('/users/admin/stats'),
  blockUser: (id) => api.put(`/users/admin/block/${id}`),
  deleteUser: (id) => api.delete(`/users/admin/${id}`),
}

export const courseAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
}

export const enrollmentAPI = {
  enroll: (courseId) => api.post(`/enroll/enroll/${courseId}`),
  getMyCourses: () => api.get('/enroll/my-courses'),
  updateProgress: (data) => api.post('/enroll/progress/update', data),
  getProgress: (courseId) => api.get(`/enroll/progress/${courseId}`),
}

export const paymentAPI = {
  createPaymentIntent: (data) => api.post('/payment/create-payment-intent', data),
  verify: (data) => api.post('/payment/verify', data),
}

export const reviewAPI = {
  create: (data) => api.post('/reviews', data),
  getCourseReviews: (courseId) => api.get(`/reviews/${courseId}`),
}

export default api
