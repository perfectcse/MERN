Day-18

Pagination in API

GET /api/posts?page=1&limit=5

page → current page
limit → items per page

skip = (page-1) * limit

MongoDB:
.skip()
.limit()