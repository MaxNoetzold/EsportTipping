import getMatchTipsForSplit from "../getMatchTipsForSplit";

const getTipsOfUsers = async (userIdList: string[], splitName: string) => {
  const tips: { [key: string]: any } = {}; // Add index signature to allow indexing with a string parameter
  const tipPromises = userIdList.map(async (userId) => {
    const userTips = await getMatchTipsForSplit(splitName, userId);
    tips[userId] = userTips;
  });
  await Promise.all(tipPromises);
  return tips;
};

export default getTipsOfUsers;
