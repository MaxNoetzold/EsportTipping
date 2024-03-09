import "dotenv/config";

import expressApp from "./server";
import connectToDatabase from "./mongodb/connectToDatabase";

console.log("Start Server");

await connectToDatabase();

const port = process.env.PORT || 3000;
expressApp.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// TODO: Add a teardown (to close db conn)
