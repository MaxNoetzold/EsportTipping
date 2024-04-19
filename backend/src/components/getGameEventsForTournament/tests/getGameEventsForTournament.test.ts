import getGameEventsForTournament from "../getGameEventsForTournament";
import unfilteredLecSchedule from "../../../test/exampleData/formattedUnfilteredLecSchedule.json";
import GameEvent from "../../../utils/mongodb/schemas/GameEvent";
import updateGameEventsInDatabase from "../../updateLeagueSchedule/updateGameEventsInDatabase";

test("gets all matches for spring_2024", async () => {
  // first we need to add some matches to the database
  // then we can test that getGameEventsForTournament returns the correct matches
  const matches = await getGameEventsForTournament("lec_spring_2024");
  expect(matches).toHaveLength(0);

  const unfilteredLecMatches: any[] = JSON.parse(
    JSON.stringify(unfilteredLecSchedule)
  );
  expect(unfilteredLecMatches).toHaveLength(80);

  // Safe the matches in the database
  await updateGameEventsInDatabase(unfilteredLecMatches);
  // check that all 80 matches are in the database
  const matchesInDatabase = await GameEvent.find({}).lean();
  expect(matchesInDatabase).toHaveLength(80);

  // get the matches for spring_2024
  const matchesFor2024Spring = await getGameEventsForTournament(
    "lec_spring_2024"
  );
  expect(matchesFor2024Spring).toHaveLength(60);
});
