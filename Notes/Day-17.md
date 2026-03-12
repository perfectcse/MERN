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