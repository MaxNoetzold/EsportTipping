import "dotenv/config";

import expressApp from "./server";
import connectToDatabase from "./mongodb/connectToDatabase";

console.log("Start Server");

console.log("Connecting to the database");
await connectToDatabase();
console.log("Connected to the database");

const port = process.env.PORT || 3000;
expressApp.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// TODO: Add a teardown (to close db conn)
