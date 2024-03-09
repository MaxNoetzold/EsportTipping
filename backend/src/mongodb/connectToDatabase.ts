import mongoose from "mongoose";

const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }
  mongoose.connection.on("error", (error) => {
    console.error("Error connecting to the database", error);
  });

  // I dont want to detect errors on initial connection
  // because I want the server to crash if it doesnt work
  await mongoose.connect(process.env.MONGODB_URI);
};

export default connectToDatabase;
