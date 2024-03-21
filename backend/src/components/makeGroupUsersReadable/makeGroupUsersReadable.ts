import UserModel from "../../utils/mongodb/schemas/User";
import { TippingGroup } from "../../utils/types/TippingGroup";

const makeGroupUsersReadable = async (
  group: TippingGroup
): Promise<TippingGroup> => {
  const userIds = [
    group.owner,
    ...group.members.map((member) => member.userId),
  ];
  const users = await UserModel.find({ discordUserId: { $in: userIds } }, [
    "globalName",
    "discordUserId",
  ]).lean();

  return {
    ...group,
    ownerName: users.find((user) => user.discordUserId === group.owner)
      ?.globalName,
    members: group.members.map((member) => ({
      ...member,
      userName: users.find((user) => user.discordUserId === member.userId)
        ?.globalName,
    })),
  };
};

export default makeGroupUsersReadable;
