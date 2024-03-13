import axios, { AxiosInstance } from "axios";

let _api: AxiosInstance | null = null;

const _initAPI = () => {
  const _config = {
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  _api = axios.create(_config);
  return _api;
};

const getAPI = () => {
  if (_api) return _api;
  return _initAPI();
};

export { getAPI };
