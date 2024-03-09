import mongoose from "mongoose";
import connectToDatabase from "../mongodb/connectToDatabase";

beforeAll(async () => {
  connectToDatabase();
});

afterEach(async () => {
  // cleanup database after each test
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});
