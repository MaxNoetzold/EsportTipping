import getLecScheduleForSplit from "../getLecScheduleForSplit";
import unfilteredLecSchedule from "../../../test/exampleData/formattedUnfilteredLecSchedule.json";
import updateLecMatchesInDatabase from "../../updateLecSchedule/updateLecMatchesInDatabase";
import GameEvent from "../../../utils/mongodb/schemas/GameEvent";

test("gets all matches for spring_2024", async () => {
  // first we need to add some matches to the database
  // then we can test that getLecScheduleForSplit returns the correct matches
  const matches = await getLecScheduleForSplit("spring_2024");
  expect(matches).toHaveLength(0);

  const unfilteredLecMatches: any[] = JSON.parse(
    JSON.stringify(unfilteredLecSchedule)
  );
  expect(unfilteredLecMatches).toHaveLength(80);

  // Safe the matches in the database
  await updateLecMatchesInDatabase(unfilteredLecMatches);
  // check that all 80 matches are in the database
  const matchesInDatabase = await GameEvent.find({}).lean();
  expect(matchesInDatabase).toHaveLength(80);

  // get the matches for spring_2024
  const matchesFor2024Spring = await getLecScheduleForSplit("spring_2024");
  expect(matchesFor2024Spring).toHaveLength(60);
});
