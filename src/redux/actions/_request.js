import axios from 'axios';

const initializeHeader = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default async (method, url, token = null, data = null) => {
  initializeHeader(token);
  const { data: res } = await axios[method](url, data);
  return res;
};
