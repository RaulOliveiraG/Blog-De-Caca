import axios, { type AxiosError } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, 
});

let isRefreshing = false;
let failedRequestsQueue: Array<{ resolve: (token: string) => void; reject: (err: AxiosError) => void; }> = [];

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await api.post('/auth/refresh-token');
          const { accessToken } = response.data;

          localStorage.setItem('@BlogDeCaca:token', accessToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

          failedRequestsQueue.forEach(request => request.resolve(accessToken));
          failedRequestsQueue = [];

          if (error.config) {
            error.config.headers['Authorization'] = `Bearer ${accessToken}`;
            return axios.request(error.config);
          }

        } catch (refreshError) {
          failedRequestsQueue.forEach(request => request.reject(error));
          failedRequestsQueue = [];
          localStorage.removeItem('@BlogDeCaca:token');
          delete api.defaults.headers.common['Authorization'];
          
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          resolve: (token: string) => {
            if (error.config) {
              error.config.headers['Authorization'] = `Bearer ${token}`;
              resolve(axios.request(error.config));
            }
          },
          reject: (err: AxiosError) => {
            reject(err);
          },
        });
      });
    }

    return Promise.reject(error);
  }
);