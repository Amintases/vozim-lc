import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Что-то пошло нет так')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me:  `${HOST_API}/api/v1/client/user`,
    login: `${HOST_API}/api/v1/client/auth/b2c/login`,
    code:`${HOST_API}/api/v1/client/auth/b2c/smsConfirm`,
    resendCode:`${HOST_API}/api/v1/client/auth/b2c/smsResend`,
    register: `${HOST_API}/api/v1/client/auth/b2c/register`,
  },
  home:{
    orders:`/api/v1/client/orders/list`
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
};
