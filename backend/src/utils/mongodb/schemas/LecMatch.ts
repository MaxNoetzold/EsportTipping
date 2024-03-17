import mongoose from "mongoose";

const { Schema } = mongoose;

const TeamSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  image: { type: String, required: true },
  result: {
    outcome: { type: String },
    gameWins: { type: Number, required: true },
  },
  record: {
    wins: { type: Number, required: true },
    losses: { type: Number, required: true },
  },
});

const LecMatchSchema = new Schema({
  matchId: { type: String, unique: true, required: true },
  startTime: { type: Date, required: true },
  state: { type: String, required: true },
  type: { type: String, required: true },
  blockName: { type: String, required: true },
  league: {
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  match: {
    flags: { type: [String], required: true },
    teams: { type: [TeamSchema], required: true },
    strategy: {
      count: { type: Number, required: true },
      type: { type: String, required: true },
    },
  },
});

const LecMatchModel = mongoose.model("LecMatch", LecMatchSchema);

export default LecMatchModel;
