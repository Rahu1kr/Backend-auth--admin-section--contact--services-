const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
// const { isValid } = require("zod");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    // if you attempt to use an expired token, you'll receive a "401 unauthorized HTTP" response.
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("token form auth middleware", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({
        password: 0,
    });
    console.log(userData);



// In Express.js req (request) object is an object that contains information about
// the HTTP request. By adding custom properties to req, you can
// pass information between middleware functions or make it available in your
// route handlers.

    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }

};

module.exports = authMiddleware;
