import { getAPI } from ".";

const getMeApi = async () => {
  const api = getAPI();
  const response = await api.get("/api/auth/@me");
  return response.data;
};

export default getMeApi;
