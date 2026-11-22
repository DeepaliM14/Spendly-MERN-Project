import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api/v1"
      : "https://spendly-mern-project.onrender.com/api/v1",

  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
