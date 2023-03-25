const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (res.headersSent) {
    return next(err);
  } else {
    if (err.message) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(404).json({ error: "requested url was not found" });
    }
  }
};

module.exports = errorHandler;
