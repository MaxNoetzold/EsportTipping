import unfilteredLecScheduleJSON from "../../../test/exampleData/formattedUnfilteredLecSchedule.json";
import { IGameEvent } from "../../../utils/types/GameEvent";
import fetchLeagueSchedule from "../fetchLeagueSchedule";
import updateGameEventsInDatabase from "../updateGameEventsInDatabase";
import updateLeagueSchedule from "../updateLeagueSchedule";

jest.mock("../fetchLeagueSchedule", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../updateGameEventsInDatabase", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("updateLeagueSchedule tests", () => {
  it("should filter events and update database", async () => {
    const unfilteredLecSchedule: IGameEvent[] = JSON.parse(
      JSON.stringify(unfilteredLecScheduleJSON)
    );
    (fetchLeagueSchedule as jest.Mock).mockResolvedValue(unfilteredLecSchedule);
    (updateGameEventsInDatabase as jest.Mock).mockResolvedValue(undefined);

    // Actually test the function
    await updateLeagueSchedule("lec");

    const expectedEvents = unfilteredLecSchedule.filter(
      (event) => event.tournament.slug === "lec_spring_2024"
    );
    expect(updateGameEventsInDatabase).toHaveBeenCalledWith(expectedEvents);

    // Clean up seems not to be necessary
    // (fetchLecSchedule as jest.Mock).mockRestore();
    // (updateLecMatchesInDatabase as jest.Mock).mockRestore();
  });
});
