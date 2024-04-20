import express from "express";
import GameEvent from "../utils/mongodb/schemas/GameEvent";

const leagueRouter = express.Router();

// get all leagues that we stored so far
leagueRouter.get("/", async (req, res) => {
  const leagues = await GameEvent.find().distinct("league.slug");

  res.json(leagues);
});

// get all tournaments for a specific league
leagueRouter.get("/:league/tournaments", async (req, res) => {
  const { league } = req.params;
  const tournaments = await GameEvent.find({ "league.slug": league }).distinct(
    "tournament.slug"
  );

  res.json(tournaments);
});

export default leagueRouter;
