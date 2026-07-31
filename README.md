# Online Course Platform

A full-stack online course platform where users discover, purchase, and learn from courses, while admins manage content and users.

## Tech Stack

### Frontend
- **React 19** + **Vite 5**
- **Tailwind CSS 3** — CSS-variable-based color system with dark/light themes
- **React Router 7** — nested routes, protected routes, admin routes
- **Stripe Elements** (`@stripe/react-stripe-js`) — card checkout
- **Axios** — HTTP client with JWT interceptor and auto-logout on 401
- **React Hot Toast** — toast notifications
- **React Icons** — Heroicons set

### Backend
- **Node.js** + **Express 4**
- **JSON Web Tokens (JWT)** — 7-day token auth with bcrypt password hashing
- **Stripe API** — PaymentIntent-based payments (INR)
- **Nodemailer** — password reset emails

## Features

### User Features
- **Authentication** — register, login, forgot/reset password
- **Course Catalog** — browse all courses, search by keyword, filter by category, sort by price/newest
- **Course Details** — modules & lessons, pricing, instructor info
- **Checkout** — Stripe card payment via PaymentIntent
- **My Dashboard** — enrolled courses with progress tracking
- **Reviews** — rate courses 1–5 stars, one review per user per course
- **Profile** — update name/email, change password

### Admin Features
- **Admin Panel** — dedicated sidebar layout
- **Course Management** — create, edit, delete, and list courses
- **User Management** — view all users, block/delete accounts
- **Stats Dashboard** — users, courses, revenue, enrollments

### UI
- **Dark/Light Mode** — toggle in the navbar, persisted to `localStorage`
- **Responsive Design** — mobile-first layout with collapsible navigation
- **Clean Component Library** — consistent buttons, inputs, cards, and badges

## Project Structure

```
├── backend/                # Express API
│   ├── config/             # DB connection, env config
│   ├── controllers/        # Route handlers
│   ├── middleware/         # JWT auth & role guards
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── utils/              # Token & email helpers
│   └── server.js           # App entry point
│
└── frontend/               # React SPA (Vite)
    ├── src/
    │   ├── components/     # Navbar, Footer, CourseCard, Reviews, ThemeToggle...
    │   ├── context/        # AuthContext, ThemeContext
    │   ├── pages/          # Home, Courses, CourseDetail, Dashboard, Profile...
    │   │   ├── admin/      # Admin dashboard & management pages
    │   │   └── auth/       # Login, Register, ForgotPassword
    │   ├── services/       # Axios API client
    │   └── App.jsx         # Route definitions
    ├── index.html
    └── tailwind.config.js
```

## Getting Started

### Prerequisites
- Node.js 18+
- Stripe test keys (publishable + secret)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_xxx
```

Run the server:

```bash
npm run dev     # nodemon, auto-reload
# or
npm start       # node server.js
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_STRIPE_KEY=pk_test_xxx
```

Run the dev server:

```bash
npm run dev     # starts at http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`.

### Build

```bash
cd frontend
npm run build   # outputs optimized build to dist/
```

## API Overview

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Log in, returns JWT |
| POST | `/api/auth/forgot-password` | Request password reset email |
| GET | `/api/courses` | List courses (search/filter/sort) |
| GET | `/api/courses/:id` | Get a single course |
| POST | `/api/courses` | Create a course (admin) |
| PUT | `/api/courses/:id` | Update a course (admin) |
| DELETE | `/api/courses/:id` | Delete a course (admin) |
| POST | `/api/payment/create-payment-intent` | Create Stripe PaymentIntent |
| POST | `/api/payment/verify` | Verify payment & create enrollment |
| GET | `/api/enroll/my-courses` | Get enrolled courses |
| POST | `/api/enroll/progress/update` | Update lesson progress |
| GET | `/api/reviews/:courseId` | Get reviews for a course |
| POST | `/api/reviews` | Submit a review |
| PUT | `/api/users/profile` | Update profile |
| PUT | `/api/users/change-password` | Change password |

## Key Notes
- Admin accounts are seeded manually with `role: "admin"`
- Course modules and lessons are embedded in the course document
- Progress percentage is calculated as `completedLessons / totalLessons`
- All API responses are JSON; errors follow the format `{ "message": "..." }` with the correct HTTP status code
