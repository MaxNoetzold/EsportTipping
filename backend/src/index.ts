import getLecSchedule from "./utils/getLecSchedule.js";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = path.join(__dirname, "../data");
const tmpFilePath = path.join(dataDir, "tmp.json");

const START_DATE_SPRING_2024 = new Date("2024-03-09T00:00:00Z");

const events: Array<any> | undefined = await getLecSchedule();
if (events) {
  const springSplitEvents: Array<any> = events.filter(
    (event: any) => event.startTime > START_DATE_SPRING_2024
  );

  console.log(springSplitEvents);
  // store this json data in file
  const jsonData = JSON.stringify(springSplitEvents);
  fs.writeFileSync(tmpFilePath, jsonData);
}

// store data in mongodb
