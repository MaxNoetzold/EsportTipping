import { getAPI } from ".";

const logoutApi = async () => {
  const api = getAPI();
  const response = await api.delete("/api/auth");
  return response.data;
};

export default logoutApi;
