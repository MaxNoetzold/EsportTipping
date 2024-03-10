import fetchLecSchedule from "../fetchLecSchedule";
import updateLecMatchesInDatabase from "../updateLecMatchesInDatabase";
import updateLecSchedule from "../updateLecSchedule";
import unfilteredLecScheduleJSON from "../../../test/exampleData/formattedUnfilteredLecSchedule.json";
import { GameEvent } from "../../../utils/types/LecEvent";

jest.mock("../fetchLecSchedule", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../updateLecMatchesInDatabase", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("updateLecSchedule tests", () => {
  it("should filter events and update database", async () => {
    const unfilteredLecSchedule: GameEvent[] = JSON.parse(
      JSON.stringify(unfilteredLecScheduleJSON)
    );
    (fetchLecSchedule as jest.Mock).mockResolvedValue(unfilteredLecSchedule);
    (updateLecMatchesInDatabase as jest.Mock).mockResolvedValue(undefined);

    // Actually test the function
    await updateLecSchedule();

    const expectedEvents = unfilteredLecSchedule.filter(
      (event) => event.startTime > new Date("2024-03-09T00:00:00Z")
    );
    expect(updateLecMatchesInDatabase).toHaveBeenCalledWith(expectedEvents);

    // Clean up seems not to be necessary
    // (fetchLecSchedule as jest.Mock).mockRestore();
    // (updateLecMatchesInDatabase as jest.Mock).mockRestore();
  });
});
