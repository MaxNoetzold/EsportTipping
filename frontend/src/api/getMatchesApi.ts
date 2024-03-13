import { getAPI } from ".";

const getMatchesApi = async (splitName: string) => {
  const api = getAPI();
  const response = await api.get("/api/schedule", {
    params: {
      split: splitName,
    },
  });
  return response.data;
};

export default getMatchesApi;
