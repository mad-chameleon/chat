import axios, { isAxiosError } from 'axios';

import routes from '../routes';

const defaultOptions = { baseUrl: routes.baseApiPath() };
const axiosBaseQuery = (options = defaultOptions) => {
  const { baseUrl } = options;
  return async ({
    url,
    method,
    data,
    headers,
  }) => {
    try {
      const response = await axios({
        url: `${baseUrl}${url}`,
        method,
        data,
        headers,
      });
      return { data: response.data };
    } catch (err) {
      if (isAxiosError(err)) {
        return {
          error: {
            status: err.response?.status,
            data: err,
          },
        };
      }
      return {
        error: {
          status: err.response?.status,
          data: err,
        },
      };
    }
  };
};

const createAxiosBaseQuery = (options = defaultOptions) => async (args, { getState }) => {
  const headers = {};
  const { token } = getState().user.userInfo;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return axiosBaseQuery(options)({ ...args, headers });
};

export default createAxiosBaseQuery;
