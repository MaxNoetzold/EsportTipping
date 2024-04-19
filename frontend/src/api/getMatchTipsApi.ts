import axios from "axios";
import { getAPI } from ".";
import { MatchTip } from "../types/MatchTip";

// TODO: league and splitname should be parameters
const getMatchTipsApi = async (splitName: string) => {
  try {
    const api = getAPI();
    const response = await api.get("/api/tipping", {
      params: {
        split: splitName,
      },
    });
    return response.data as MatchTip[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export default getMatchTipsApi;
