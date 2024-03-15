import mongoose from "mongoose";

const { Schema } = mongoose;

const MatchTipSchema = new Schema({
  matchId: { type: String, required: true },
  discordUserId: { type: String, required: true },
  winningTeamCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// create an index to ensure that a user can only tip once per match
//  sideeffect: this will also speed up the query for these properties
MatchTipSchema.index({ matchId: 1, discordUserId: 1 }, { unique: true });

MatchTipSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

const MatchTipModel = mongoose.model("MatchTip", MatchTipSchema);

export default MatchTipModel;
