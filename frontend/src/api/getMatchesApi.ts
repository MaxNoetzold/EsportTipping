import axios from "axios";

const getMatchesApi = async (splitName: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/schedule`,
    {
      params: {
        split: splitName,
      },
    }
  );
  return response.data;
};

export default getMatchesApi;
