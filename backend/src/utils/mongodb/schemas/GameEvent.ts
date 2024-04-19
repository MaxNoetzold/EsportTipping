import mongoose from "mongoose";

const { Schema } = mongoose;

const LeagueSchema = new Schema({
  id: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
});

const TeamResultSchema = new Schema({
  outcome: { type: String, default: null },
  gameWins: { type: Number, required: true },
});

const TeamRecordSchema = new Schema({
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  ties: { type: Number, required: true },
});

const TeamSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  image: { type: String, required: true },
  result: { type: TeamResultSchema, default: null },
  record: { type: TeamRecordSchema, default: null },
  side: { type: String, enum: [null, "red", "blue"], default: null },
});

const StrategySchema = new Schema({
  type: { type: String, required: true },
  count: { type: Number, required: true },
});

const MatchSchema = new Schema({
  flags: { type: [String], required: true },
  teams: { type: [TeamSchema], required: true },
  strategy: { type: StrategySchema, required: true },
});

const TournamentSchema = new Schema({
  id: { type: String, required: true },
  slug: { type: String, required: true },
});

const GameEventSchema = new Schema({
  blockName: { type: String, required: true },
  matchId: { type: String, required: true },
  league: { type: LeagueSchema, required: true },
  match: { type: MatchSchema, required: true },
  startTime: { type: Date, required: true },
  state: { type: String, required: true },
  tournament: { type: TournamentSchema, required: true },
});

const GameEvent = mongoose.model("GameEvent", GameEventSchema);

export default GameEvent;
