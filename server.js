// app.get: Set up a route handler for HTTP GET requests.
// "/": Defines the route path, responding to the root URL.

// (req, res) => {...}: An arrow function handling the request
// (req) and constructing the response (res).

// res.send("Hello, World!");: Sends the "Hello, world!"
// message as the response when the route is accessed.

require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router")
// const PORT = 8000;
const cors = require("cors")
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");



//   The CORS(Cross-Orign Resource Sharing) policy is a security feature
// implemented by web browsers to restrict webpages from making 
// requests to a different domain than the one that served the webpage.
// In the context of a MERN stack (MongoDB, Express.js, React, Node.js)
// application, you might encounter CORS issues when the frontend
// (React) and backend (Express.js) are hosted on different domains.

// let's tackle cors
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));



// app.use(express.json());: This line of code adds Express middlesware that parses
// incoming request bodies with JSON payloads. It's important to place this before
// any routes that need to handle JSON data in the request body. This middleware is
// responsible for parsing JSON data from requests, and it should be applied at the
// beginning of your middleware stack to ensure it's available for all subsequent
// route handlers.
app.use(express.json());


// Mount the Router: To use the router in your main Express app, you can "mount" it at
// a specific URL prefix
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// let's define admin route
app.use("/api/admin", adminRoute);


// for error handling, more folder are in error-middleware.js
app.use(errorMiddleware);


 
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running at port: ${process.env.PORT}`);
  });
});

// "action" is the description of what you want to do, while
// "dispatch" is the function that carries out that action.
