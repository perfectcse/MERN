# MERN Stack Challenge – Day 1 to 29

## Focus
- JavaScript fundamentals
- React basics
- Small hands-on practice

---

## JavaScript Basics

### var vs let vs const
- var → function scoped (avoid)
- let → block scoped, value can change
- const → block scoped, value cannot change

Example:
```js
let count = 1;
count = 2;

const name = "Vishal";
// name = "New"; ❌ not allowed
.....................................
# MERN Stack Challenge – Day 2

## Topics
- React events
- Conditional rendering
- API basics

## React Events
- onClick
- onChange
- Used to handle user actions

## Conditional Rendering
- Ternary operator
- && operator
- Show/hide UI based on state

## API Basics
- API = data source
- fetch() used to get data
- Frontend consumes APIs

## Practice
- Show/Hide message
- Input handling

## Learning
- State controls UI
- React updates UI automatically
..............................
# MERN Stack Challenge – Day 3

## Topics
- API basics
- fetch()
- useEffect
- Data rendering

## API
- Sends JSON data
- Frontend consumes API

## useEffect
- Runs after render
- Used for side effects
- [] = run once

## Practice
- Fetched 5 posts
- Rendered using map()

## Learning
- useEffect is key for API calls
- State stores API data
.......................
# MERN Stack Challenge – Day 4

## Topics
- Controlled components
- Form handling
- POST request

## Controlled Component
- Input value managed by state
- onChange updates state

## Form Submit
- e.preventDefault() prevents reload

## POST Request
- method: "POST"
- headers: Content-Type
- body: JSON.stringify()

## Learning
- React can send data to server
- Forms are core to web apps
.............................
Day-5 – React + Express

Backend:
- Express setup
- GET route
- res.json()
- CORS

Frontend:
- useEffect
- Fetch API
- useState
- Dynamic rendering

Flow:
React → Express → JSON → UI

Key Lesson:
Always test backend alone first.
................................
Day-6 – MongoDB Integration

Learned:
- MongoDB Atlas
- Mongoose
- Schema
- Model
- POST API
- GET API
- dotenv
- Debugging auth errors

Flow:
Express → Mongoose → MongoDB → Response

Main Achievement:
Real data stored in cloud database.

Day-7 – Full MERN Integration

Learned:
- Fetch real DB data
- Use MongoDB _id
- Create post from frontend
- Connect frontend to backend
- Full request-response cycle

Architecture:
React → Express → MongoDB → Express → React

Achievement:
CREATE + READ completed.

Day-8 – DELETE Operation

Learned:
- Route params (:id)
- req.params usage
- findByIdAndDelete()
- Sending DELETE request from frontend
- Refreshing UI after deletion

CRUD Status:
Create ✔
Read ✔
Delete ✔
Update Pending
........................
Day-9 – UPDATE Operation

Learned:
- PUT method in REST API
- Route params (:id)
- req.body usage
- findByIdAndUpdate()
- Controlled form editing
- Dynamic button text
- Full CRUD complete

CRUD Status:
Create ✔
Read ✔
Update ✔
Delete ✔
.................................
Day-10 – Backend Refactor

Learned:
- Separation of concerns
- Controllers handle logic
- Routes handle endpoints
- Clean server.js setup
- Basic MVC structure

Achievement:
Converted single-file backend into scalable structure.

Day-11 – API Response Structure Handling

Problem:
Backend response changed from array to object.
posts.map failed because posts was not array.

Fix:
Changed:
setPosts(data)
To:
setPosts(data.data)

Learning:
Frontend must match backend response format.
Structured API responses are professional.
Always inspect API response before using .map().

Core Concepts Strengthened:

- Array: .map works only on arrays
- Object: Access nested values using dot notation
- JSON: Backend sends JSON, frontend parses it
- API: Frontend must match backend response format

Big Lesson:
Always inspect API response shape before using data.

...........................................
Day-12 – Centralized Error Handling

Learned:
- Removed try/catch repetition
- Created asyncHandler wrapper
- Built global error middleware
- Used next(error) for error flow
- Error middleware must be last
- Structured error responses

Day-13 Authentication + Protected CRUD

Architecture Upgrade:
Controller → asyncHandler → next(error) → errorMiddleware
Backend now scalable & professional.

Authentication + Protected CRUD

* User Registration with hashed passwords (bcrypt)
* Login with JWT token generation
* Token stored in localStorage
* Backend JWT verification middleware
* Protected frontend routes using React Router

🛡 Protected API Routes

* Create Post (Protected)
* Update Post (Protected)
* Delete Post (Protected)
* Read Posts (Public)
* Authorization header used:

📝 CRUD Features
* Add new post
* Edit existing post
* Delete post
* Real-time UI updates
* Persistent MongoDB storage

⚛ Frontend Features
* Protected Home route
* Login/Register pages
* Dynamic Navbar
* Edit mode toggle
* Smooth UX
* Modern responsive UI

🧠 Concepts Covered
* JWT Authentication
* Middleware in Express
* Password Hashing
* RESTful API Structure
* React State Management
* useEffect best practices
* Route protection

🔥 Tech Stack
React
Node.js
Express.js
MongoDB Atlas
JWT
bcryptjs

🧠 Final Reflection Question (Write This in Notebook)
Answer this in your own words:

* What is JWT?
* Why hash passwords?
* What happens when token expires?
* How does middleware protect routes?
* What is the difference between login and register flow?

* Today I implemented:
* Role field in User model
* JWT payload customization
* Protect middleware
* Admin-only middleware
* 401 vs 403 handling
* Frontend role-based rendering
* Secure delete endpoint
.....................
* Key Learnings:
* Authentication vs Authorization
* Middleware chaining
* JWT role embedding
* Backend security layering
* Role-based UI rendering

Day-15 Coding Summary
NEW
src/utils/auth.js

MODIFIED
src/App.jsx
src/pages/Login.jsx

🔥 Day-16 Completed
Added Validation Middleware to my MERN backend.
Now the API verifies request data before saving it to the database.
Learning clean backend architecture step by step 🚀

Day-17
Global Error Handling Middleware

Purpose:
Centralize API error handling.

Error flow:
Route → next(error) → errorMiddleware → response

Example:
catch(error){
 next(error)
}

Middleware signature:
(err, req, res, next)

Must be last in server.js

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

Day-24:
- Implemented frontend pagination
- Managed page state in React
- Connected page with API query params
- Added Previous and Next buttons
- Learned pagination flow frontend → backend → database

Day-25:
- Created Layout component
- Created Dashboard page
- Created StatsCard reusable component
- Added Dashboard route
- Learned reusable component architecture
- Learned layout structure in React

Day-26:
- Created /api/auth/me API
- Created Profile page
- Added Profile route
- Added Profile link in Navbar
- Protected Profile route
- Fetch current logged-in user
- Authorization header
- JWT user identification
Day-27
What I Learned Today
How comment system works
How to connect Post and Comment collections
How to protect routes using JWT middleware
How to fetch data using useEffect
How to refresh data after API action
Component communication using props
Basic UI styling
Full backend + frontend integration

Day 28 of MERN Stack 🚀
Today I started working on the Reply to Comments (Nested Comments) feature in my MERN Blog project.
Learning:
• Nested comments structure
• Parent & child comments
• Improving Single Post page
• Better UI for comments section
Project is slowly becoming a full MERN Blog / Social App.

Day-29 Work:
- Implemented Like Comment feature
- Implemented Edit Comment feature
- Added edited flag in comments
- Display likes count in UI
- Display comment timestamp
- Only comment owner can edit/delete
- Used PUT request for update operations
- Updated comment routes and controller
- Added edit UI in React
- Used conditional rendering for edit input
