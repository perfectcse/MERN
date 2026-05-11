# MERN Stack Blog Application

A comprehensive MERN (MongoDB, Express.js, React.js, Node.js) stack project built through a 36-day challenge. This application features a full-featured blog with user authentication, CRUD operations, comments, likes, bookmarks, and more.

## 🚀 Project Overview

This project was developed as part of a 36-day MERN Stack Challenge, starting from JavaScript fundamentals and progressing to a complete full-stack application. The journey covered everything from basic React components to advanced features like JWT authentication, role-based authorization, and complex database relationships.

## 🛠 Tech Stack

- **Frontend**: React.js, React Router, Axios, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas, Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **File Upload**: Multer
- **Validation**: Custom middleware
- **Deployment**: (Not specified in logs)

## ✨ Features

### Core Features
- ✅ User Registration & Login with JWT Authentication
- ✅ Role-based Authorization (Admin/User)
- ✅ CRUD Operations for Posts
- ✅ Comments System with Nested Replies
- ✅ Like & Bookmark Posts
- ✅ Like Comments
- ✅ Profile Management with Image Upload
- ✅ Dashboard with Statistics
- ✅ Search, Sort, Pagination, and Date Filtering
- ✅ Responsive UI with Modern Design

### Advanced Features
- 🔐 Protected Routes
- 📝 Rich Text Posts
- 💬 Real-time Comment Interactions
- 📊 Analytics Dashboard
- 🔍 Advanced Search & Filtering
- 📅 Date-based Filtering
- 🎨 Toast Notifications & Loading States

## 📁 Project Structure

```
MERN/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── commentController.js
│   │   ├── dashboardController.js
│   │   └── postController.js
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── Comment.js
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── postRoutes.js
│   ├── uploads/
│   ├── package.json
│   └── server.js
├── react-counter/  # (Separate React project for counter app)
└── Notes/          # Daily challenge notes
```

## 📚 Daily Challenge Logs

### Phase 1: JavaScript & React Fundamentals (Days 1-4)

#### Day 1: JavaScript Basics
- **Focus**: JavaScript fundamentals, React basics, hands-on practice
- **Topics**: `var` vs `let` vs `const`, scoping rules
- **Key Learning**: Understanding variable declarations and scope

#### Day 2: React Events & Conditional Rendering
- **Topics**: React events (`onClick`, `onChange`), conditional rendering, API basics
- **Practice**: Show/hide messages, input handling
- **Key Learning**: State controls UI, React's automatic UI updates

#### Day 3: API Integration with useEffect
- **Topics**: `fetch()` API, `useEffect` hook, data rendering
- **Practice**: Fetching and rendering 5 posts using `map()`
- **Key Learning**: `useEffect` for API calls, state for storing data

#### Day 4: Forms & POST Requests
- **Topics**: Controlled components, form handling, POST requests
- **Practice**: Form submission with `e.preventDefault()`
- **Key Learning**: React can send data to servers, forms are core to web apps

### Phase 2: Backend Development (Days 5-9)

#### Day 5: React + Express Integration
- **Backend**: Express setup, GET routes, `res.json()`, CORS
- **Frontend**: `useEffect`, Fetch API, `useState`, dynamic rendering
- **Flow**: React → Express → JSON → UI
- **Key Lesson**: Always test backend independently first

#### Day 6: MongoDB Integration
- **Learned**: MongoDB Atlas, Mongoose schemas, models, POST/GET APIs, dotenv
- **Flow**: Express → Mongoose → MongoDB → Response
- **Achievement**: Real cloud database storage

#### Day 7: Full MERN Stack Integration
- **Learned**: Fetching real DB data, using MongoDB `_id`, frontend-backend connection
- **Architecture**: React → Express → MongoDB → Express → React
- **Achievement**: CREATE + READ operations completed

#### Day 8: DELETE Operations
- **Learned**: Route parameters (`:id`), `req.params`, `findByIdAndDelete()`
- **CRUD Status**: Create ✅, Read ✅, Delete ✅, Update ⏳

#### Day 9: UPDATE Operations
- **Learned**: PUT method, `req.body`, `findByIdAndUpdate()`, controlled editing
- **CRUD Status**: Full CRUD completed ✅

### Phase 3: Backend Architecture & Authentication (Days 10-16)

#### Day 10: Backend Refactoring
- **Learned**: Separation of concerns, MVC structure, controllers vs routes
- **Achievement**: Scalable backend architecture

#### Day 11: API Response Handling
- **Problem**: Response structure mismatch (array vs object)
- **Solution**: Proper data access (`data.data`)
- **Key Learning**: Frontend must match backend response format

#### Day 12: Centralized Error Handling
- **Learned**: `asyncHandler` wrapper, global error middleware, `next(error)`
- **Architecture**: Controller → asyncHandler → next(error) → errorMiddleware

#### Day 13: Authentication & Protected CRUD
- **Features**: JWT authentication, hashed passwords, protected routes
- **Frontend**: Login/Register pages, dynamic navbar, route protection

#### Day 14: Role-Based Authorization
- **Implemented**: Role field, JWT customization, admin middleware, 401/403 handling
- **Key Learnings**: Authentication vs Authorization, middleware chaining

#### Day 15: Frontend Authentication Utils
- **New**: `src/utils/auth.js`
- **Modified**: Login page, App.jsx

#### Day 16: Validation Middleware
- **Added**: Request data validation before database operations
- **Learning**: Clean backend architecture

### Phase 4: Advanced Features (Days 17-26)

#### Day 17: Global Error Handling
- **Purpose**: Centralized API error handling
- **Flow**: Route → next(error) → errorMiddleware → response

#### Day 18: API Pagination
- **Implementation**: `GET /api/posts?page=1&limit=5`
- **MongoDB**: `.skip()`, `.limit()`

#### Day 19: Search & Filtering
- **Implementation**: `GET /api/posts?search=react`
- **MongoDB**: `$regex`, case-insensitive search

#### Day 20: Sorting API
- **Implementation**: Query parameter sorting
- **MongoDB**: `.sort()` with various criteria

#### Day 21: Advanced Filtering
- **MongoDB**: `$or` operator for multi-field search

#### Day 22: Date Filtering
- **MongoDB**: `$gte`, `$lte` for date ranges

#### Day 23: Frontend-Backend Integration
- **Learned**: API query params, `useEffect` dependencies, real-time UI

#### Day 24: Frontend Pagination
- **Features**: Page state management, Previous/Next buttons

#### Day 25: Layout & Dashboard
- **Components**: Layout, Dashboard page, StatsCard
- **Learning**: Reusable components, React layout structure

#### Day 26: User Profile System
- **Features**: `/api/auth/me`, Profile page, image upload, protected routes

### Phase 5: Comments & Social Features (Days 27-32)

#### Day 27: Comments System
- **Learned**: Post-Comment relationships, JWT protection, `useEffect` data fetching

#### Day 28: Nested Comments
- **Features**: Parent-child comment structure, improved UI

#### Day 29: Comment Interactions
- **Features**: Like comments, edit comments, timestamps, owner permissions

#### Day 30: Dashboard Statistics
- **Features**: MongoDB aggregation, role-based authorization

#### Day 31: Project Summary
- **Backend**: Full authentication, role-based access, advanced APIs
- **Frontend**: Complete UI with all features
- **Learnings**: JWT flow, MongoDB relations, file uploads

#### Day 32: Feature Completion
- **Features**: Like posts, bookmarks, nested comments, profile uploads

### Phase 6: UI/UX Improvements (Days 33-36)

#### Day 33: Backend & Frontend Upgrades
- **Improvements**: Enhanced search/pagination/sorting, fixed dashboard stats

#### Day 34: User Experience Enhancements
- **Features**: Toast notifications, loading states, improved error handling

#### Day 35: Component Architecture
- **Refactoring**: Reusable components (PostCard, Loader, EmptyState)

#### Day 36: Interactive Features
- **Features**: Like/bookmark toggles, instant UI updates, better feedback

## 🧠 Key Learnings & Reflections

### JWT Authentication
**What is JWT?** JSON Web Token - a compact, URL-safe means of representing claims between two parties. Used for securely transmitting information as a JSON object.

**Why hash passwords?** To protect user credentials. Hashing transforms passwords into irreversible strings, so even if the database is compromised, passwords remain secure.

**What happens when token expires?** The user is logged out and must re-authenticate. Tokens have expiration times for security.

**How does middleware protect routes?** Middleware intercepts requests, verifies JWT tokens, and grants/denies access based on authentication and authorization rules.

**Difference between login and register:**
- **Register**: Create new account, hash password, store in DB, generate JWT
- **Login**: Verify credentials, generate JWT if valid

### Technical Concepts
- **Authentication vs Authorization**: AuthN verifies identity, AuthZ determines permissions
- **Middleware Chaining**: Sequential request processing in Express
- **MongoDB Relations**: Connecting User, Post, and Comment collections
- **API Design**: RESTful structure with proper HTTP methods
- **React Patterns**: State management, effects, protected routes

### Architecture Principles
- Separation of concerns (MVC)
- Centralized error handling
- Async/await with error boundaries
- Responsive design
- Component reusability

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MERN
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with MongoDB URI and JWT secret
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../react-counter  # Note: This appears to be a separate React app
   npm install
   npm run dev
   ```

### Environment Variables
Create a `.env` file in the backend directory:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## 📖 Usage

1. Register a new account or login
2. Create posts, add comments, like/bookmark content
3. View dashboard for statistics (admin features)
4. Manage profile with image upload

## 🤝 Contributing

This was a personal learning challenge, but feel free to fork and extend the project!

## 📄 License

This project is for educational purposes.

---

**Challenge Duration**: 36 Days  
**Final Status**: Complete MERN Stack Blog Application  
**Key Achievement**: From JavaScript basics to production-ready full-stack app

*Built with dedication and curiosity* 🚀
🌐 Live Project Links
Frontend
https://mern-frontend-e9vw.onrender.com

Backend API
https://mern-backendd-hxj0.onrender.com