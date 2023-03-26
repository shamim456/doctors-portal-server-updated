const jwt = require("jsonwebtoken");
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("unauthorized access");
  }

  const token = authHeader.split(" ")[1];

  //   console.log("ball..................." + token);
  //   console.log("fuck.............." + process.env.SECRET_KEY);

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      console.log(err + 'verify jwt route');
      return next();
    }
    console.dir(res.headersSent);
    req.decoded = decoded;

    next();
  });
}

module.exports = verifyJWT;
