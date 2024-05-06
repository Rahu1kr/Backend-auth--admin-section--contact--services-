const mongoose = require("mongoose");
// -----------------------
//  1 st DB connection
// ----------------------
const URI = process.env.MONGODB_URI;
// mongoose.connect(URI);

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection successful to DB");
    } catch (error) {
        console.error("database connection failed");
        process.exit(0);
    }
};

module.exports = connectDB;
// -------------------------------------------------------1st