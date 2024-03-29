import axios from "axios";
import { getAPI } from ".";
import { GameEvent } from "../types/LecEvent";

const getMatchesApi = async (splitName: string) => {
  try {
    const api = getAPI();
    const response = await api.get("/api/schedule", {
      params: {
        split: splitName,
      },
    });
    return response.data as GameEvent[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export default getMatchesApi;
