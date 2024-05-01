const jwt = require("jsonwebtoken");
const validator = require("validator");

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token || validator.isEmpty(token)) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId || !validator.isMongoId(decoded.userId)) {
      console.log("Invalid token.");
      return res.status(401).json({ errors: ["Invalid token."]} );
    }
    req.body.userId = decoded.userId;
    req.body.email = decoded.email;
  } catch (error) {
    console.log("Error verifying token:", error);
    return res.status(401).json({ errors: ["Invalid token."] });
  }

  return next();
};

const authBlock = (req, res, next) => {
  const token = req.cookies.token;
  if (!token || validator.isEmpty(token)) {
    console.log("no token provided");
    return res.status(401).json({ errors: ["Please log in first to view or edit."] });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded.userId || !validator.isMongoId(decoded.userId)) {
    return res.status(401).json({ errors: ["You've been logged out. Please log in again."] });
  }
  req.body.userId = decoded.userId;
  req.body.email = decoded.email;
  console.log("validated: ", decoded.email);
  return next();
};

module.exports = {auth, authBlock};
