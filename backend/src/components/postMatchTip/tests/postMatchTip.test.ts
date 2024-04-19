import postMatchTip from "../postMatchTip";
import GameEvent from "../../../utils/mongodb/schemas/GameEvent";
import MatchTipModel from "../../../utils/mongodb/schemas/MatchTip";

jest.mock("../../../utils/mongodb/schemas/LecMatch");

describe("postMatchTip", () => {
  it("should post a match tip", async () => {
    const matchId = "matchId1";
    const teamId = "teamId1";
    const discordUserId = "discordUserId1";

    const mockMatch = {
      matchId,
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 2),
    };

    (GameEvent.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockMatch),
    });

    const result = await postMatchTip(matchId, teamId, discordUserId);

    expect(GameEvent.findOne).toHaveBeenCalledWith({ matchId });

    // check in the memory database
    const matchInDb = await MatchTipModel.findOne({
      matchId,
      discordUserId,
    }).lean();
    // check general data
    expect(result).toEqual(matchInDb);
    expect(matchInDb?.discordUserId).toEqual(discordUserId);
    expect(matchInDb?.matchId).toEqual(matchId);
    expect(matchInDb?.tippedTeamCode).toEqual(teamId);
    expect(matchInDb?.updatedAt).toBeDefined();
    expect(matchInDb?.createdAt).toBeDefined();
  });

  it("should update the updatedAt property when a tip is updated", async () => {
    const matchId = "matchId1";
    const teamId = "teamId1";
    const discordUserId = "discordUserId1";

    const mockMatch = {
      matchId,
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 2),
    };

    (GameEvent.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockMatch),
    });

    const result1 = await postMatchTip(matchId, teamId, discordUserId);
    const result2 = await postMatchTip(matchId, teamId, discordUserId);

    const matchInDb = await MatchTipModel.findOne({
      matchId,
      discordUserId,
    }).lean();

    expect(result2).toEqual(matchInDb);
    expect(matchInDb?.updatedAt).toBeDefined();
    expect(result1?.updatedAt).not.toEqual(result2?.updatedAt);
  });

  it("should throw an error if the match has already started", async () => {
    const matchId = "matchId1";
    const teamId = "teamId1";
    const discordUserId = "discordUserId1";

    const mockMatch = {
      matchId,
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    };

    (GameEvent.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockMatch),
    });

    await expect(postMatchTip(matchId, teamId, discordUserId)).rejects.toThrow(
      "Match has already started"
    );
  });
});
