import axios from "axios";
import { getAPI } from ".";

const getTournamentsApi = async (leagueSlug: string) => {
  try {
    const api = getAPI();
    const response = await api.get(`/api/leagues/${leagueSlug}/tournaments`);
    return response.data as string[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export default getTournamentsApi;
