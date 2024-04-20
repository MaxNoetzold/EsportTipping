import axios from "axios";
import { getAPI } from ".";
import { MatchTip } from "../types/MatchTip";

const getMatchTipsApi = async ({
  league,
  tournament,
}: {
  league?: string;
  tournament?: string;
}) => {
  try {
    const params: {
      league?: string;
      tournament?: string;
    } = {};
    if (league) {
      params.league = league;
    }
    if (tournament) {
      params.tournament = tournament;
    }
    if (!league && !tournament) {
      throw new Error("Either league or tournament must be provided");
    }

    const api = getAPI();
    const response = await api.get("/api/tipping", { params });
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
