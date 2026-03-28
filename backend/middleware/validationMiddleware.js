const validatePost = (req, res, next) => {
  let { title, body } = req.body;

  // Trim spaces
  title = title?.trim();
  body = body?.trim();

  if (!title || !body) {
    return res.status(400).json({
      success: false,
      message: "Title and body are required",
    });
  }

  if (title.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Title must be at least 3 characters",
    });
  }

  if (body.length < 5) {
    return res.status(400).json({
      success: false,
      message: "Body must be at least 5 characters",
    });
  }

  req.body.title = title;
  req.body.body = body;

  next();
};

module.exports = { validatePost };