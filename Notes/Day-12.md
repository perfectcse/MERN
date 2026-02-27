Day-12 – Centralized Error Handling

Learned:
- Removed try/catch repetition
- Created asyncHandler wrapper
- Built global error middleware
- Used next(error) for error flow
- Error middleware must be last
- Structured error responses

Architecture Upgrade:
Controller → asyncHandler → next(error) → errorMiddleware

Backend now scalable & professional.