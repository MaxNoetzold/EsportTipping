import { getAPI } from ".";
import { MatchTip } from "../types/MatchTip";

const postMatchTipApi = async (matchId: string, teamCode: string) => {
  const api = getAPI();
  const response = await api.post("/api/tipping", {
    matchId,
    teamCode,
  });
  return response.data as MatchTip;
};

export default postMatchTipApi;
