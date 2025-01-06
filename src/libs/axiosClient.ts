import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api", // Use `localhost` instead of `127.0.0.1`
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
