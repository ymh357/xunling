import axios from 'axios';

// 创建 axios 实例
export const api = axios.create({
  baseURL: 'YOUR_API_BASE_URL',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 这里可以添加token等认证信息
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 统一的错误处理
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
