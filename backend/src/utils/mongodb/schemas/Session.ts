import mongoose from "mongoose";

const { Schema } = mongoose;

const SessionSchema = new Schema({
  oauthState: { type: String, required: true, unique: true },
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  expires_at: { type: Number, required: true },
  discordUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const SessionModel = mongoose.model("Session", SessionSchema);

export default SessionModel;
