import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

const useAxios = () => {
  const { token, logout, login } = useAuth();
  const [instance, setInstance] = useState(() => axios.create());

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: 'http://192.168.5.103:8000/api',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) throw new Error("No refresh token available");

            const { data } = await axios.post(
              'http://192.168.5.103:8000/api/token/refresh/',
              { refresh: refreshToken }
            );

            // Yeni token'ı sakla ve login işlemi yap
            localStorage.setItem('access_token', data.access);
            login(data.access, refreshToken);

            // Yeni token'ı header'a ekle
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.access}`;
            originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

            // Orijinal isteği yeniden yap
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
