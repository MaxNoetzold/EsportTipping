import mongoose from "mongoose";

const { Schema } = mongoose;

const TeamSchema = new Schema({
  name: String,
  code: String,
  image: String,
  result: {
    outcome: String,
    gameWins: Number,
  },
  record: {
    wins: Number,
    losses: Number,
  },
});

const LecMatchSchema = new Schema({
  matchId: { type: String, unique: true },
  startTime: Date,
  state: String,
  type: String,
  blockName: String,
  league: {
    name: String,
    slug: String,
  },
  match: {
    flags: [String],
    teams: [TeamSchema],
    strategy: {
      type: String,
      count: Number,
    },
  },
});

const LecMatchModel = mongoose.model("LecMatch", LecMatchSchema);

export default LecMatchModel;
