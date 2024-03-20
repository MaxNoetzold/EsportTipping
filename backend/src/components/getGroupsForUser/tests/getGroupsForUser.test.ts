import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import getGroupsForUser from "../getGroupsForUser";
import TippingGroupModel from "../../../utils/mongodb/schemas/TippingGroup";

test("getGroupsForUser returns correct groups", async () => {
  const discordUserId = "1234";

  const group1 = new TippingGroupModel({
    owner: discordUserId,
    name: "Group 1",
    members: [{ userId: discordUserId, role: "player" }],
    league: "League 1",
  });

  const group2 = new TippingGroupModel({
    owner: "5678",
    name: "Group 2",
    members: [{ userId: discordUserId, role: "player" }],
    league: "League 2",
  });

  const group3 = new TippingGroupModel({
    owner: "5678",
    name: "Group 3",
    members: [{ userId: "91011", role: "player" }],
    league: "League 3",
  });

  await group1.save();
  await group2.save();
  await group3.save();

  const groups = await getGroupsForUser(discordUserId);

  expect(groups).toHaveLength(2);
  expect(groups).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: "Group 1" }),
      expect.objectContaining({ name: "Group 2" }),
    ])
  );
});
