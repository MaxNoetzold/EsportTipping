import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  discordUserId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  globalName: { type: String, required: true },
  avatar: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
