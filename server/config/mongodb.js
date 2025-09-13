import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Set up event listeners FIRST
    mongoose.connection.on("connected", () => {
      console.log(" Database connected successfully!");
    });
    
    mongoose.connection.on("error", (err) => {
      console.error(" Database connection error:", err);
    });
    
    // Then connect
    await mongoose.connect(`${process.env.MONGODB_URI}/Authentification_System`);
    
  } catch (error) {
    console.error(" Failed to connect to database:", error.message);
    process.exit(1); // Exit if database connection fails
  }
};

export default connectDB;
