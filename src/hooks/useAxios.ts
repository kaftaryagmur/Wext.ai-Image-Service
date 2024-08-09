import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

const useAxios = () => {
  const { token, logout } = useAuth();
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

        // Token'ın süresi dolmuşsa ve bu istekte yenileme yapılmamışsa
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Refresh token kullanarak yeni access token alın
            const { data } = await axios.post(
              'http://192.168.5.103:8000/api/token/refresh',
              {
                refresh: localStorage.getItem('refresh_token'),
              }
            );

            // Yeni token'ı saklayın
            localStorage.setItem('access_token', data.access);

            // Yeni token'ı header'a ekleyin
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.access}`;
            originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

            // Orijinal isteği yeniden yapın
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
  }, [token, logout]);

  return instance;
};

export default useAxios;
