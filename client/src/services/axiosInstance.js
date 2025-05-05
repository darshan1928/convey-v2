import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;

const BaseUrl = VITE_BACKEND_URL;
let AccessToken;
const OpenAxios = axios.create({
  baseURL: BaseUrl,
  withCredentials: true,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

OpenAxios.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined")
      AccessToken = localStorage.getItem("AccessToken");
    if (AccessToken && AccessToken !== "undefined" && AccessToken !== "") {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${AccessToken}`,
      };
    }
    return config;
  },
  (error) => {
    console.log("error in axios request", error);
    return Promise.reject(error);
  }
);

OpenAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (error.response.status === 401) {
      // localStorage.clear();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// sending files using axios
const FileUploadAxios = axios.create({
    baseURL: BaseUrl,
    headers: {
      "Content-Type": "multipart/form-data", // Set the content type for file uploads
    },
    withCredentials: false,
  });
export { OpenAxios, FileUploadAxios };
