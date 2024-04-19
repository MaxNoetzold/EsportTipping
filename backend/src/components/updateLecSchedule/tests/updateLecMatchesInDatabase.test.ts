import updateLecMatchesInDatabase from "../updateLecMatchesInDatabase";
import GameEvent from "../../../utils/mongodb/schemas/GameEvent";
import formattedSpringSplit2024RegularSchedule from "../../../test/exampleData/formattedSpringSplit2024RegularSchedule.json";
import { IGameEvent } from "../../../utils/types/GameEvent";

it("should update the database with the provided LEC matches", async () => {
  const lecMatches: IGameEvent[] = JSON.parse(
    JSON.stringify(formattedSpringSplit2024RegularSchedule)
  );

  // Call the function to update the database
  await updateLecMatchesInDatabase(lecMatches);

  // Verify that the LEC matches were correctly updated in the database
  for (const lecMatch of lecMatches) {
    const matchInDb = await GameEvent.findOne({
      matchId: lecMatch.matchId,
    }).lean();
    expect(matchInDb).toBeDefined();

    // Remove _id properties from matchInDb and its nested objects
    const matchInDbWithoutIds = JSON.parse(
      JSON.stringify(matchInDb),
      (key, value) => (key === "_id" ? undefined : value)
    );

    expect(matchInDbWithoutIds).toMatchObject(lecMatch);
  }
});
