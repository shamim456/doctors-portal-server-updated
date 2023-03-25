const notFoundErrorHandler = (req, res, next) => {
  next("requested url was not found");
};

module.exports = notFoundErrorHandler;
