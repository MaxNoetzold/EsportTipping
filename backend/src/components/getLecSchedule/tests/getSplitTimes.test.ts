import getSplitTimes from "../getSplitTimes";

test("knows the start and end dates for 2024_spring", () => {
  const splitTimes = getSplitTimes("2024_spring");
  const startDate = new Date("2024-03-09T00:00:00Z");
  const endDate = new Date("2024-04-06T00:00:00Z");
  expect(splitTimes.start).toEqual(startDate);
  expect(splitTimes.end).toEqual(endDate);
});
