import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

const useAxios = () => {
  const { token, logout, login } = useAuth();
  const [instance, setInstance] = useState(() => axios.create());

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: 'http://20.52.97.229:8000/api',
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
              'http://20.52.97.229:8000/api/token/refresh',
              {
                refresh: localStorage.getItem('refresh_token'),
              }
            );
          
            console.log('Token yenilendi:', data.access);
          
            localStorage.setItem('access_token', data.access);
            login(data.access, localStorage.getItem('refresh_token') || '');
          
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.access}`;
            originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
          
            console.log('Orijinal istek yeniden yapılıyor:', originalRequest);
          
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
