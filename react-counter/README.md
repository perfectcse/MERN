🚀 MERN Stack 100-Day Challenge
Building a production-ready MERN Stack application step by step while documenting the learning journey.
This challenge focuses on understanding real backend architecture, authentication, security, and scalable API design.

🧠 Tech Stack
Frontend

React
React Router
CSS

Backend

Node.js
Express.js
MongoDB
Mongoose

Authentication & Security

JWT Authentication
Role Based Access Control (RBAC)
Validation Middleware
Global Error Handling


📅 Progress (Day-1 → Day-23)
Day-1
Introduction to MERN challenge.
Project setup and basic React environment.
Day-2
Understanding React components and state.
Day-3
Fetching data from an API using fetch.
Day-4
Setting up Node.js + Express backend.
Day-5
Connecting React frontend with Express backend.
Day-6
Integrating MongoDB with Mongoose.
Day-7
Creating the Post model and storing data in MongoDB.
Day-8
Implementing Create Post functionality from frontend.
Day-9
Building Full CRUD operations:

Create
Read
Update
Delete

Day-10
Understanding API architecture and backend flow.
Day-11
Handling frontend API errors and responses.
Day-12
Improving backend project structure.
Day-13
Implemented JWT Authentication:

User login
Token generation
Protected routes

Day-14
Added Role-Based Authorization (RBAC):

Admin role
Protected admin actions
Secure API access

Day-15
Implemented JWT Expiry Handling:

Token expiration check
Auto logout when token expires
Session management on frontend

Day-16
Added Request Validation Middleware:

Validate API request data
Prevent invalid data from entering the database
Proper 400 Bad Request responses

Day-17
Implemented Global Error Handling Middleware:

Centralized error responses
next(error) pattern in Express
Cleaner and more maintainable backend architecture

Day-18

Pagination in API

GET /api/posts?page=1&limit=5

page → current page
limit → items per page

skip = (page-1) * limit

MongoDB:
.skip()
.limit()

Day-19

Search + Filtering API

GET /api/posts?search=react

MongoDB search:
$regex
$options: "i"

Combine with pagination
?page=1&limit=5

Day-20

Sorting API

req.query.sort

MongoDB:
.sort()

latest → createdAt: -1
oldest → createdAt: 1
title → title: 1

Combine:
search + pagination + sorting

Day-21
Advanced Filtering

MongoDB:
$or

Search multiple fields:
title + body

Combine:
search + sort + pagination

Day-22

Date Filtering

MongoDB:
$gte
$lte

Filter:
createdAt

Combine:
search + sort + pagination + date

Day-23:
- Learned API query params (search, sort)
- Connected frontend filters with backend
- useEffect dependency concept
- MongoDB regex search
- Sorting using .sort()
- Built real-time dynamic UI

⚙️ Backend Architecture
backend
│
├── middleware
│   ├── authMiddleware.js
│   ├── validationMiddleware.js
│   └── errorMiddleware.js
│
├── models
│   ├── User.js
│   └── Post.js
│
├── routes
│   ├── authRoutes.js
│   └── postRoutes.js
│
└── server.js


🔐 Authentication Flow
User Login
    ↓
JWT Token Generated
    ↓
Token stored in LocalStorage
    ↓
Protected API requests
    ↓
Backend verifies token


📦 API Features Implemented

User Registration
User Login
JWT Authentication
Role Based Authorization
Create Post
Update Post
Delete Post (Admin only)
Validation Middleware
Global Error Middleware


📘 Concepts Learned

REST API Design
Express Middleware
JWT Authentication
Role Based Authorization
Request Validation
Global Error Handling
MongoDB CRUD Operations
Frontend-Backend Integration


🚀 Next Goals
Upcoming improvements in the challenge:

Advanced API features
Pagination & filtering
File upload handling
API security improvements
Advanced frontend architecture
Full project deployment


💪 Challenge Goal
The goal is to build a complete full-stack production-ready MERN application over 100 days while documenting the learning process.
Consistency over perfection.

🔗 Connect
Sharing the learning journey on X (Twitter) while building in public.
#MERNStack #100DaysOfCode #BuildInPublic
