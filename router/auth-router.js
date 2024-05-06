// express.Router

// In express.js, express,Router() is a mini Express application without all the server
// configurations but with the ability to define routes, middleware, and have its own set of
// route handlers. It allows you to modularize your routes and middleware to keep your code
// organized and maintainable.

// https://expressjs.com/en/guide/routing.html
// Use the express.Router class to create.moduler, mountable route handlers. A router instance
// is a complete middleware and routing system; for this reason, it is often referred to as a
// "mini-app".

const express = require("express");
const router = express.Router();
const {signupSchema, loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
// const {home, registration} = require("../controllers/auth-controller");
const authcontrollers = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");

// 1 //    router.get("/", (req, res) => {
//   res.status(200).send("world");
// });

// 2 // router.route("/").get((req, res)=>{
//  res.status(200).send("Hello");
// })

router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(signupSchema), authcontrollers.registration);
router.route("/login").post(validate(loginSchema),authcontrollers.login);

router.route("/user").get(authMiddleware ,authcontrollers.user);

module.exports = router;
