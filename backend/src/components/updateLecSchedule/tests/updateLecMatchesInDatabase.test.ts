// Import necessary modules
import fs from "fs";
import path from "path";
import updateLecMatchesInDatabase from "../updateLecMatchesInDatabase";
import LecMatchModel from "../../../mongodb/schemas/LecMatch";
import deepEqual from "deep-equal";

// Test the updateLecMatchesInDatabase function
it("should update the database with the provided LEC matches", async () => {
  // Read the LEC matches from the JSON file
  const lecMatches = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "springSplit2024RegularSchedule.json"),
      "utf-8"
    )
  );

  // Call the function to update the database
  await updateLecMatchesInDatabase(lecMatches);

  // Verify that the LEC matches were correctly updated in the database
  for (const lecMatch of lecMatches) {
    const matchInDb = await LecMatchModel.findOne({
      matchId: lecMatch.matchId,
    });
    expect(matchInDb).toBeDefined();
    expect(deepEqual(matchInDb, lecMatch)).toBe(true);
  }
});
