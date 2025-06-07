import axios from "axios";

console.log(process.env.NEXT_PUBLIC_API_URL);

const chatApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

chatApi.interceptors.request.use((config) => {
  config.headers = Object.assign(config.headers, {
    "x-token": localStorage.getItem("token") || "",
  });
  return config;
});

export default chatApi;
