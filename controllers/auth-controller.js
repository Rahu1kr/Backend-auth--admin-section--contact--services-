// Controllers

// In an Express.js application, a "controller" refers to a part of your code
// that is responsible for handling the application's logic. Controllers are
// typically used to process incoming requests, interact with models (data sources),
// and send responses back to clients. They help organize your application by
// separating concerns and following the MVC (Model-View-Controller) design pattern.

const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Home Logic

const home = async (req, res) => {
  try {
    res.status(200).send("welcome to world Rahul.");
  } catch (error) {
    res.status(400).send({ message: "page not found" });
  }
};

// --------------------------------
// 3rd Registration
// --------------------------------

// User Registration Login
// 1. Get Registration Data: Retrieve user data(username, email, password).
// 2. Check Email Existence: Check if the email is already registered.
// 3. Hash Password: Securely hash the password.
// 4. Create User: Create a new user with hashed password.
// 5. Save to DB: Save user data to the database.
// 6. Respond: Respond with "Registration Successfu" or handle errors.

const registration = async (req, res) => {
  try {
    // console.log(req.body);
    // res.status(200).json({message: req.body});

    console.log(req.body);
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    // hash the password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, 10);

    // database storing in db
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(200).json({
      msg: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

// In most cases, converting _id to a string is a good practive because it ensures consistency
// and compatibility across different JWT libraries and systems. It also aligns with the
// expectation that claims in a JWT are represented as strings.

// ---------------------------------3rd end--------------------------------------------------------------------------------

// --------------------------------
// 4rd Login
// --------------------------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

// ---------------4th end--------------------

// ---------------------------------------------
// to send user data - User Logic
// ---------------------------------------------

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

module.exports = { home, registration, login, user };
