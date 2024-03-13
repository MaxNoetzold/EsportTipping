import axios from "axios";

const loginApi = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/login`
  );
  return response.data;
};

export default loginApi;
