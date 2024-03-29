import SessionModel from "../../utils/mongodb/schemas/Session";

const cleanupOldSessions = async () => {
  const now = new Date();
  await SessionModel.deleteMany({
    sessionExpiresAt: { $lt: now },
  }).exec();
};

export default cleanupOldSessions;
