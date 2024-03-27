import axios from "axios";
import { getAPI } from ".";
import { User } from "../types/User";

const getMeApi = async () => {
  try {
    const api = getAPI();
    const response = await api.get("/api/auth/@me");
    return response.data as User;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export default getMeApi;
