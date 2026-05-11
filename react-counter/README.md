# 🚀 MERN Stack 100-Day Challenge

A comprehensive 100-day journey to build a production-ready MERN (MongoDB, Express.js, React.js, Node.js) stack application. This challenge focuses on mastering real backend architecture, authentication, security, and scalable API design while documenting the entire learning process.

## 🎯 Challenge Overview

- **Duration**: 100 Days
- **Focus**: Production-ready full-stack development
- **Goal**: Build a complete MERN blog/social application
- **Approach**: Consistency over perfection, build in public
- **Current Status**: Days 1-36 completed

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- CSS (Modern responsive design)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM

### Authentication & Security
- JWT (JSON Web Tokens)
- Role-Based Access Control (RBAC)
- Request Validation Middleware
- Global Error Handling
- Password Hashing (bcryptjs)

## ✨ Key Features Built

### Core Features
- ✅ Full CRUD Operations (Posts)
- ✅ User Authentication & Authorization
- ✅ Role-Based Access (Admin/User)
- ✅ JWT Token Management & Expiry Handling
- ✅ Protected Routes & API Endpoints
- ✅ Comments System with Nested Replies
- ✅ Like & Bookmark Functionality
- ✅ Profile Management with Image Upload
- ✅ Dashboard with Statistics
- ✅ Advanced Search, Sort, Pagination & Filtering

### Advanced Features
- 🔐 Secure API Architecture
- 📊 Real-time Analytics Dashboard
- 💬 Interactive Comment System
- 📱 Responsive Modern UI
- 🔍 Multi-field Search & Date Filtering
- 🎨 Toast Notifications & Loading States
- 📝 Rich Text Post Creation

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
├── react-counter/  # React application
└── Notes/          # Daily challenge documentation
```

## 📅 Daily Progress (Days 1-36)

### Phase 1: Foundations & Setup (Days 1-4)

#### Day 1: Project Introduction
- MERN challenge kickoff
- Project setup and basic React environment
- Understanding the 100-day journey ahead

#### Day 2: React Components & State
- Deep dive into React components
- State management fundamentals
- Component lifecycle basics

#### Day 3: API Integration Basics
- Fetching data from external APIs
- Understanding async operations in React
- Basic data rendering

#### Day 4: Backend Setup
- Setting up Node.js + Express server
- Basic server configuration
- Understanding backend architecture

### Phase 2: Full-Stack Integration (Days 5-12)

#### Day 5: Frontend-Backend Connection
- Connecting React frontend with Express backend
- Basic API communication
- Understanding client-server relationship

#### Day 6: Database Integration
- Integrating MongoDB with Mongoose
- Database connection setup
- Schema design principles

#### Day 7: Data Modeling
- Creating the Post model
- MongoDB data storage
- Understanding document-based databases

#### Day 8: Create Functionality
- Implementing Create Post from frontend
- Form handling and submission
- Real-time data creation

#### Day 9: Complete CRUD Operations
- **Create**: Add new posts
- **Read**: Display posts
- **Update**: Edit existing posts
- **Delete**: Remove posts
- Full CRUD implementation

#### Day 10: API Architecture
- Understanding backend flow
- API design patterns
- Request-response cycle

#### Day 11: Error Handling
- Frontend API error management
- User-friendly error messages
- Graceful failure handling

#### Day 12: Backend Refactoring
- Improving project structure
- Code organization
- Maintainable architecture

### Phase 3: Authentication & Security (Days 13-17)

#### Day 13: JWT Authentication
- User registration and login
- JWT token generation
- Protected route implementation

#### Day 14: Role-Based Authorization
- Admin role implementation
- Protected admin actions
- Secure API access control

#### Day 15: Token Management
- JWT expiry handling
- Auto logout functionality
- Frontend session management

#### Day 16: Request Validation
- Input validation middleware
- Preventing invalid data entry
- Proper HTTP status codes (400 Bad Request)

#### Day 17: Global Error Handling
- Centralized error responses
- Express `next(error)` pattern
- Clean, maintainable backend architecture

### Phase 4: Advanced API Features (Days 18-24)

#### Day 18: API Pagination
- Implementing pagination: `GET /api/posts?page=1&limit=5`
- MongoDB `.skip()` and `.limit()`
- Efficient data retrieval

#### Day 19: Search & Filtering
- Text search: `GET /api/posts?search=react`
- MongoDB regex with case-insensitive options
- Combined search + pagination

#### Day 20: Sorting API
- Dynamic sorting via query parameters
- MongoDB `.sort()` method
- Multiple sort criteria (latest, oldest, title)

#### Day 21: Advanced Filtering
- Multi-field search using MongoDB `$or`
- Complex query combinations
- Enhanced search capabilities

#### Day 22: Date Filtering
- Date range filtering with `$gte` and `$lte`
- Filtering by `createdAt`
- Combined date + other filters

#### Day 23: Frontend-Backend Integration
- Connecting frontend filters to backend APIs
- `useEffect` dependency management
- Real-time dynamic UI updates

#### Day 24: Frontend Pagination
- Page state management in React
- Previous/Next navigation
- Complete pagination flow

### Phase 5: UI Components & User Features (Days 25-30)

#### Day 25: Layout & Dashboard
- Layout component creation
- Dashboard page implementation
- Reusable StatsCard component
- Component architecture patterns

#### Day 26: User Profile System
- `/api/auth/me` endpoint
- Profile page with user data
- Protected profile routes
- JWT user identification

#### Day 27: Comments System
- Comment model and relationships
- JWT-protected comment routes
- Data fetching with `useEffect`
- Component communication patterns

#### Day 28: Nested Comments
- Parent-child comment structure
- Enhanced Single Post page
- Improved comments UI
- Social app evolution

#### Day 29: Comment Interactions
- Like and edit comment features
- Comment ownership validation
- Timestamps and edit flags
- Conditional UI rendering

#### Day 30: Dashboard Analytics
- MongoDB aggregation pipelines
- Statistics API development
- Role-based dashboard access
- Grid layout CSS

### Phase 6: Feature Completion & Polish (Days 31-36)

#### Day 31: Project Milestone
- Major features completion summary
- Full-stack integration verification
- Authentication and authorization
- Advanced API capabilities

#### Day 32: Authentication Flow
- Complete auth flow documentation
- Token storage and verification
- Middleware user extraction

#### Day 33: Backend Optimization
- Search, pagination, sorting upgrades
- Dashboard statistics fixes
- Error-free code optimization

#### Day 34: UX Improvements
- Toast notifications replacing alerts
- Loading states and feedback
- Enhanced error handling
- Professional user experience

#### Day 35: Component Architecture
- Reusable component creation
- Code structure cleanup
- Modular development practices

#### Day 36: Interactive Features
- Like/bookmark toggles
- Instant UI updates
- Improved button feedback
- Production-ready interactions

## 🧠 Key Learnings & Concepts Mastered

### Authentication & Security
- **JWT Flow**: Token generation → storage → verification → expiry handling
- **Role-Based Access**: Admin vs User permissions, middleware protection
- **Security Best Practices**: Password hashing, input validation, error handling

### Backend Architecture
- **MVC Pattern**: Controllers, routes, models separation
- **Middleware Chain**: Request processing pipeline
- **Error Handling**: Centralized error management with `next(error)`

### Database & API Design
- **MongoDB Operations**: CRUD, aggregation, regex search, pagination
- **RESTful APIs**: Proper HTTP methods, status codes, response structure
- **Query Optimization**: Efficient data retrieval and filtering

### Frontend Development
- **React Patterns**: State management, effects, protected routes
- **Component Architecture**: Reusable components, props communication
- **User Experience**: Loading states, notifications, responsive design

### Full-Stack Integration
- **Client-Server Communication**: API calls, error handling, data flow
- **Authentication Flow**: Login → token → protected requests → logout
- **Real-time Updates**: Dynamic UI, state synchronization

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- npm or yarn package manager

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
   # Create .env file with:
   # MONGO_URI=your_mongodb_connection_string
   # JWT_SECRET=your_secret_key
   # PORT=5000
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../react-counter
   npm install
   npm run dev
   ```

### Usage
1. Register a new account or login
2. Create posts, add comments, interact with content
3. Access dashboard for analytics (admin features)
4. Manage profile and settings

## 🎯 Challenge Goals & Philosophy

- **100-Day Commitment**: Consistent daily progress over perfection
- **Production-Ready**: Focus on scalable, secure, maintainable code
- **Build in Public**: Documenting the journey for learning and accountability
- **Real-World Skills**: Authentication, security, API design, UI/UX

## 🔗 Connect & Follow

Sharing this learning journey on X (Twitter) while building in public.

**Hashtags**: #MERNStack #36DaysOfCode #BuildInPublic

---

