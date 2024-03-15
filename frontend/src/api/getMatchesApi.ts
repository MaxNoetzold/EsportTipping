import axios from "axios";
import { getAPI } from ".";

const getMatchesApi = async (splitName: string) => {
  try {
    const api = getAPI();
    const response = await api.get("/api/schedule", {
      params: {
        split: splitName,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export default getMatchesApi;
