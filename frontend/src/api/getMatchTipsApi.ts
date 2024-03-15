import { getAPI } from ".";
import { MatchTip } from "../types/MatchTip";

const getMatchTipsApi = async (splitName: string) => {
  const api = getAPI();
  const response = await api.get("/api/tipping", {
    params: {
      split: splitName,
    },
  });
  return response.data as MatchTip[];
};

export default getMatchTipsApi;
