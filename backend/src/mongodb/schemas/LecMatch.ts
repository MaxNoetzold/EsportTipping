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
      count: Number,
      type: { type: String },
    },
  },
});

// TODO: Update all relating tips when a LecMatch is updated
LecMatchSchema.post("updateOne", function (doc) {
  // 'this' is the query that triggered the updateOne operation
  // 'doc' is the document that was updated
  // Call your specific function here
});

const LecMatchModel = mongoose.model("LecMatch", LecMatchSchema);

export default LecMatchModel;
