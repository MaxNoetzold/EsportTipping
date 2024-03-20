import TippingGroupModel from "../../utils/mongodb/schemas/TippingGroup";

const addMemberToGroup = async (
  groupId: String,
  userId: String,
  role: String | undefined = undefined
) => {
  const updatedGroup = await TippingGroupModel.findOneAndUpdate(
    { _id: groupId, "members.userId": { $ne: userId }, owner: { $ne: userId } },
    {
      $push: {
        members: {
          userId,
          role,
        },
      },
    },
    { new: true }
  ).lean();

  if (!updatedGroup) {
    return await TippingGroupModel.findById(groupId).lean();
  }

  return updatedGroup;
};

export default addMemberToGroup;
