const validatePost = (req, res, next) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({
      success: false,
      message: "Title and body are required"
    });
  }

  next();
};

module.exports = {
  validatePost
};