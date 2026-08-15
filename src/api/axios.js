import axios from "axios";
import { store } from "../store/index";

const api = axios.create({
  baseURL: "https://dummyjson.com/",
});

api.interceptors.request.use(
  (config) => {
    // Attach the token to every request
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("Token does not exist");
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("Refresh token does not exist");
        }

        const { data } = await api.post("/auth/refresh", {
          refreshToken,
          expiresInMins: 1,
        });

        const newAccesToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        if (!newAccesToken && !newRefreshToken) {
          throw new Error("failed to get tokens");
        }
        
        store.dispatch({
            type: 'auth/setNewToken',
            payload: newAccesToken
        })

        if(newRefreshToken){
            localStorage.setItem("refreshToken", data.token);
        }
        
        error.config.headers.Authorization = `Bearer ${data.token}`;
        return axios(error.config); // Retry the original request
      } catch (error) {
        localStorage.removeItem("refreshToken");
        store.dispatch({ type: "auth/sessionExpired" });

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
