import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthProvider";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const useAxios = () => {
  const { token } = useAuth();

  const refresh = async () => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/token/refresh`,
      {
        refresh: localStorage.getItem("refresh_token"),
      }
    );

    localStorage.setItem("access_token", data.access);
    return data.access;
  };

  useEffect(() => {
    const requestIntercept = apiClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = token ? `Bearer ${token}` : "";
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          localStorage.setItem("access_token", newAccessToken);
          return apiClient(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.request.eject(requestIntercept);
      apiClient.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return apiClient;
};
export default useAxios;
