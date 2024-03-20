import TippingGroupModel from "../../../utils/mongodb/schemas/TippingGroup";
import addMemberToGroup from "../addMemberToGroup";

test("should add a new member to the group", async () => {
  const group = new TippingGroupModel({
    owner: "ownerId",
    members: [],
    league: "lec",
    name: "group",
  });
  await group.save();

  const updatedGroup = await addMemberToGroup(
    group._id.toString(),
    "newUserId"
  );
  expect(updatedGroup?.members).toHaveLength(1);
  expect(updatedGroup?.members[0].userId).toBe("newUserId");
});

test("should not add a member if they are already a member", async () => {
  const group = new TippingGroupModel({
    owner: "ownerId",
    members: [{ userId: "existingUserId", role: "member" }],
    league: "lec",
    name: "group",
  });
  await group.save();

  const updatedGroup = await addMemberToGroup(
    group._id.toString(),
    "existingUserId"
  );
  expect(updatedGroup?.members).toHaveLength(1);
});

test("should not add a member if they are the owner", async () => {
  const group = new TippingGroupModel({
    owner: "ownerId",
    members: [],
    league: "lec",
    name: "group",
  });
  await group.save();

  const updatedGroup = await addMemberToGroup(group._id.toString(), "ownerId");
  expect(updatedGroup?.members).toHaveLength(0);
});
