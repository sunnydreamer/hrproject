const jwt = require("jsonwebtoken");

const generateJwt = (userId, email) => {
  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: '30m'
  });
  return token;
};

module.exports = generateJwt;