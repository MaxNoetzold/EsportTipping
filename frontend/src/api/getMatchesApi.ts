import axios from "axios";
import { getAPI } from ".";
import { IGameEvent } from "../types/GameEvent";

const getMatchesApi = async ({
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
    const response = await api.get("/api/schedule", { params });
    return response.data as IGameEvent[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export default getMatchesApi;
