import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

const useAxios = () => {
  const { token, logout } = useAuth();
  const [instance, setInstance] = useState(() => axios.create());

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: 'http://192.168.5.103:8000/api', // baseURL'yi doğru ayarladığınızdan emin olun
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const { data } = await axios.post(
              'http://192.168.5.103:8000/api/token/refresh',
              {
                refresh: localStorage.getItem('refresh_token'),
              }
            );
            localStorage.setItem('access_token', data.access);
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.access}`;
            originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
            return axiosInstance(originalRequest);
          } catch (err) {
            logout();
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
