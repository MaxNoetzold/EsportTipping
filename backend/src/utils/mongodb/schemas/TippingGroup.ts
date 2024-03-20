import mongoose from "mongoose";

const { Schema } = mongoose;

const TippingGroupSchema = new Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  members: [
    {
      userId: { type: String, required: true },
      role: { type: String, default: "player" },
    },
  ],
  league: { type: String, required: true },
});

const TippingGroupModel = mongoose.model("TippingGroup", TippingGroupSchema);

export default TippingGroupModel;
