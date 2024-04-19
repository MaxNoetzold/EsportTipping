import getMatchTipsForSplit from "../getMatchTipsForSplit";
import getGameEventsForTournament from "../../getGameEventsForTournament";
import MatchTipModel from "../../../utils/mongodb/schemas/MatchTip";

jest.mock("../../getGameEventsForTournament");
jest.mock("../../../utils/mongodb/schemas/MatchTip");

describe("getMatchTipsForSplit", () => {
  it("should return match tips for a given split and user", async () => {
    const mockMatches = [{ matchId: "1" }, { matchId: "2" }, { matchId: "3" }];
    const mockTips = [
      { matchId: "1", discordUserId: "user1" },
      { matchId: "2", discordUserId: "user1" },
    ];

    (getGameEventsForTournament as jest.Mock).mockResolvedValue(mockMatches);
    (MatchTipModel.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockTips),
    });
    const result = await getMatchTipsForSplit("split1", "user1");

    expect(getGameEventsForTournament).toHaveBeenCalledWith("split1");
    expect(MatchTipModel.find).toHaveBeenCalledWith({
      discordUserId: "user1",
      matchId: { $in: ["1", "2", "3"] },
    });
    expect(result).toEqual(mockTips);
  });
});
