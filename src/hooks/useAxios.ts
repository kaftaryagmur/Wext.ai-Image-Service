import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

const useAxios = () => {
  const { token, logout, login } = useAuth();
  const [instance, setInstance] = useState(() => axios.create());

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base URL'yi .env dosyasından alıyoruz
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const { data } = await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/token/refresh`, // Refresh endpoint URL'sini .env dosyasından alıyoruz
              {
                refresh: localStorage.getItem('refresh_token'),
              }
            );

            localStorage.setItem('access_token', data.access);
            login(data.access, localStorage.getItem('refresh_token') || '');

            axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.access}`;
            originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

            return axiosInstance(originalRequest);
          } catch (err) {
            console.error('Token yenileme hatası:', err);
            logout();
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    setInstance(() => axiosInstance);
  }, [token, logout, login]);

  return instance;
};
export default useAxios;
