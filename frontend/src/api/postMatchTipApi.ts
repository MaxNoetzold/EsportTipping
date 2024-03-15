import axios from "axios";
import { getAPI } from ".";
import { MatchTip } from "../types/MatchTip";

const postMatchTipApi = async (matchId: string, teamCode: string) => {
  try {
    const api = getAPI();
    const response = await api.post("/api/tipping", {
      matchId,
      teamCode,
    });
    return response.data as MatchTip;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export default postMatchTipApi;
