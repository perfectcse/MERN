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
