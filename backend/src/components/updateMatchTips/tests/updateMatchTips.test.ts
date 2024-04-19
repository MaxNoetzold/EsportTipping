import GameEvent from "../../../utils/mongodb/schemas/GameEvent";
import MatchTipModel from "../../../utils/mongodb/schemas/MatchTip";
import updateMatchTips from "../updateMatchTips";
import completedLecMatch from "../../../test/exampleData/formattedCompletedLecMatch.json";
import incompletedMatchTip from "../../../test/exampleData/incompletedMatchTip.json";

describe("updateMatchTips", () => {
  it("should update match tips with winning team code", async () => {
    const match = new GameEvent(JSON.parse(JSON.stringify(completedLecMatch)));
    await match.save();

    const matchTip = new MatchTipModel({
      ...JSON.parse(JSON.stringify(incompletedMatchTip)),
      matchId: match.matchId,
    });
    await matchTip.save();

    // Actual function call
    await updateMatchTips();

    const updatedMatchTip = await MatchTipModel.findOne({
      matchId: match.matchId,
    });
    expect(updatedMatchTip?.winningTeamCode).toBe("VIT");
  });
});
