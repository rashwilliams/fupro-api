const jwt = require("jsonwebtoken");

require("dotenv").config();

const { SECRET } = process.env;

const requireSignin = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;
    const userPayload = await jwt.verify(authToken, SECRET);
    req.user = userPayload;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = requireSignin;
