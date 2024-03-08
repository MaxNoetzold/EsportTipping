import "dotenv/config";
import expressApp from "./server.js";
import connectToDatabase from "./mongodb/connectToDatabase.js";
await connectToDatabase();
const port = process.env.PORT || 3000;
expressApp.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map