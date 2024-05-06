// Schema: Defines the structure of the documents within a collection.
// It specifies the fields, their types, and any additional constraints or validations.

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// -----------------
// 2nd Define Schema(model)
// -----------------
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// ---------------------------2nd end------------------------------

// secure the password with the bcrypt
userSchema.pre("save", async function(next){
    // console.log("pre method", this)

    const user = this;

    if(!user.isModified("password")){
        next();
    }

    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    }catch(error){
        next(error);
    }
});


// ** What is JWT?**

// - JSON Web Tokens (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way
// for securely transmitting information between parties as a JSON object.
// - JWTs are often user for authentication and authorization in web applications.
// 1. **Authentication:** Verifying the identity of a user or client.
// 2. **Authorization:** Determining what actions a user or client is allowed to perform.


// **Components of a JWT:**

// - Header: Contains metadata about the token, such as the type of token and the signing algorithm being used.
// - Payload: Contains claims or statements about an entity (typically, the user) and additional data.
// Common claims include user ID, username, and expiration time.
// - Signature: To verify that the sender of the JWT is who it is and to ensure that the 
// message wasn't changed along the way, a signature is included.


// JSON Web token
// Token, such as JWTs(JSON Web Tokens), are typically not stored in the database along with other user
// details. Instead, they are issued by the server during the authentication process and then stored on the 
// client-side (e.g, in cookies or local storage) for later use.

userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    }catch(error){
        console.log(error);
    }
};
// compare the password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

// define the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;

// Model: Acts as a higher-level abstraction that interacts with the database based
// on the defined schema. It represents a collection and provides an interface for
// querying, creating, updating, and deleting documents in that collection.
// Models are created from schemas and enable you to work with MongoDB
// data in a more strutured manner in your application.
