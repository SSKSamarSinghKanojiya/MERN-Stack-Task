const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI);

    console.log("MongoDB Connected Successfully ", process.env.MongoDB_URI);
  } catch (error) {
    console.log("MongoDB Connection Error  ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
