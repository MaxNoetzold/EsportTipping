import getSplitTimes from "../getSplitTimes";

test("knows the start and end dates for spring_2024", () => {
  const splitTimes = getSplitTimes("spring_2024");
  const startDate = new Date("2024-03-09T00:00:00Z");
  const endDate = new Date("2024-04-15T00:00:00Z");
  expect(splitTimes.start).toEqual(startDate);
  expect(splitTimes.end).toEqual(endDate);
});
