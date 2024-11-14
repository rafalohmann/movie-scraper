const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/moviesdb";
    const mongoUsername = process.env.MONGODB_ADMINUSERNAME || "";
    const mongoPassword = process.env.MONGODB_ADMINPASSWORD || "";

    const options = {};

    // Add authentication options if username and password are provided
    if (mongoUsername && mongoPassword) {
      options.auth = { username: mongoUsername, password: mongoPassword };
      options.authSource = "admin"; // Use admin as the default authentication database
    }

    await mongoose.connect(mongoURI, options);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure code
  }
};

module.exports = connectDB;
