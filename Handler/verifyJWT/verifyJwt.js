const jwt = require("jsonwebtoken");
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("unauthorized access");
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      return next();
    }
    req.decoded = decoded;

    next();
  });
}

module.exports = verifyJWT;
