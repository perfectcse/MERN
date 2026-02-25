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