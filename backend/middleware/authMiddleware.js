const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

//wrapping in asynchandler to catch errors
const protect = asyncHandler(async (req, res, next) => {
  let token; //declaring a token variable

  // if the below conditions are satisfied, we have the token.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //splitting the token and cutting off after "bearer"

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      //returns the user without the password.

      next();
    } catch (error) {
      //catches any errors.
      res.status(401);
      throw new Error(`Not authorized, token failed: ${error}`);
    }
  }
  // IF NOT AUTHRORIZED THIS CODE WILL RUN
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
