import "dotenv/config";

import expressApp from "./server";
import connectToDatabase from "./utils/mongodb/connectToDatabase";
import cleanupOldSessions from "./components/cleanupOldSessions";
import mongoose from "mongoose";

console.log("Start Server");

// Check the environment variables
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}
if (!process.env.DEV_FRONTEND_IPS) {
  console.error("DEV_FRONTEND_IPS is not set");
  process.exit(1);
}
if (!process.env.DISCORD_AUTH_REDIRECT) {
  console.error("DISCORD_AUTH_REDIRECT is not set");
  process.exit(1);
}

console.log("Connecting to the database");
await connectToDatabase();
console.log("Connected to the database");

// Cleanup old sessions on startup and once every day
await cleanupOldSessions();
const dayMillis = 86400000;
const cleanupInterval = setInterval(cleanupOldSessions, dayMillis);

const port = process.env.PORT || 3000;
expressApp.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/* Teardown the server */
async function handleExit() {
  console.log("Stopping server");
  clearInterval(cleanupInterval);
  // Close your database connection here
  await mongoose.connection.close();
  console.log("Server stopped");
}

process.on("SIGINT", async () => {
  await handleExit();
  process.exit(); // This will trigger the 'exit' event
});
