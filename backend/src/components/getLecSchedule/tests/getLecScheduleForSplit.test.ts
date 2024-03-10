import { GameEvent } from "../../../utils/types/LecEvent";
import getLecScheduleForSplit from "../getLecScheduleForSplit";
import unfilteredLecSchedule from "../../../test/exampleData/formattedUnfilteredLecSchedule.json";
import formatLecEvents from "../../updateLecSchedule/formatLecEvents";
import updateLecMatchesInDatabase from "../../updateLecSchedule/updateLecMatchesInDatabase";
import LecMatchModel from "../../../utils/mongodb/schemas/LecMatch";

test("gets all matches for 2024_spring", async () => {
  // first we need to add some matches to the database
  // then we can test that getLecScheduleForSplit returns the correct matches
  const matches = await getLecScheduleForSplit("2024_spring");
  expect(matches).toHaveLength(0);

  const unfilteredLecMatches: any[] = JSON.parse(
    JSON.stringify(unfilteredLecSchedule)
  );
  expect(unfilteredLecMatches).toHaveLength(80);

  // Safe the matches in the database
  await updateLecMatchesInDatabase(unfilteredLecMatches);
  // check that all 80 matches are in the database
  const matchesInDatabase = await LecMatchModel.find({ type: "match" }).lean();
  expect(matchesInDatabase).toHaveLength(80);

  // get the matches for 2024_spring
  const matchesFor2024Spring = await getLecScheduleForSplit("2024_spring");
  expect(matchesFor2024Spring).toHaveLength(40);
});
