import TippingGroupModel from "../../utils/mongodb/schemas/TippingGroup";

const getGroupsForUser = async (discordUserId: string) => {
  const groups = await TippingGroupModel.find({
    $or: [
      { owner: discordUserId },
      {
        members: {
          $elemMatch: {
            userId: discordUserId,
          },
        },
      },
    ],
  }).lean();
  return groups;
};

export default getGroupsForUser;
