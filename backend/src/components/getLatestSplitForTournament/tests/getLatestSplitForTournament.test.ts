import unfilteredLecSchedule from "../../../test/exampleData/formattedUnfilteredLecSchedule.json";
import GameEvent from "../../../utils/mongodb/schemas/GameEvent";
import updateGameEventsInDatabase from "../../updateLeagueSchedule/updateGameEventsInDatabase";
import getLatestSplitForLeague from "../getLatestSplitForTournament";

test("get latest split for LEC", async () => {
  // first we need to add some matches to the database
  // then we can test that getLatestSplitForLeague returns the correct split
  const unfilteredLecMatches: any[] = JSON.parse(
    JSON.stringify(unfilteredLecSchedule)
  );
  expect(unfilteredLecMatches).toHaveLength(80);

  // Safe the matches in the database
  await updateGameEventsInDatabase(unfilteredLecMatches);
  // check that all 80 matches are in the database
  const matchesInDatabase = await GameEvent.find({}).lean();
  expect(matchesInDatabase).toHaveLength(80);

  // get the latest split for LEC
  const splitForLec = await getLatestSplitForLeague("lec");
  expect(splitForLec).toBe("lec_spring_2024");
});
