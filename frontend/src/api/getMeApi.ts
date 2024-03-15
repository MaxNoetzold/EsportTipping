import axios from "axios";
import { getAPI } from ".";

const getMeApi = async () => {
  try {
    const api = getAPI();
    const response = await api.get("/api/auth/@me");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export default getMeApi;
