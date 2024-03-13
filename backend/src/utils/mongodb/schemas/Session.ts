import mongoose from "mongoose";

const { Schema } = mongoose;

const SessionSchema = new Schema({
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  discordExpiresAt: { type: Number, required: true },
  discordUserId: { type: String, required: true },
  sessionExpiresAt: { type: Date, required: true },
});

const SessionModel = mongoose.model("Session", SessionSchema);

export default SessionModel;
