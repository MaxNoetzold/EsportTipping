import axios from "axios";
import { getAPI } from ".";

const logoutApi = async () => {
  try {
    const api = getAPI();
    const response = await api.delete("/api/auth");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export default logoutApi;
