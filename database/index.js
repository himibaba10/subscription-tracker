import mongoose from "mongoose";
import { MOGODB_URI } from "../config/config.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(MOGODB_URI);

    console.log("Connected to database!");
  } catch (err) {
    console.log("Failed to connect database", err);
    process.exit(1);
  }
};

export default connectToDB;
