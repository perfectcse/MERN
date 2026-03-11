Day-16

API Request Validation
Middleware used to validate request body before controller.
Example:
router.post("/", protect, validatePost, controller)
Returns 400 if data invalid.