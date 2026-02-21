# MERN Stack Challenge – Day 1 (9 Feb)

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
///////////////////

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
..................................
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
.....................................
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
..............................
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
.......................................
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
........................................
🚀 Day-7 Update – Full MERN Integration
................................
Completed full integration between:
React Frontend
Express Backend
MongoDB Atlas
................................
Features Implemented:
Fetch posts from MongoDB
Display real database data
Create new posts from frontend form
Automatic UI refresh after submission
....................................
Tech Stack:
React
Node.js
Express
MongoDB Atlas
Mongoose

Full MERN data flow successfully implemented.

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
.....................................
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