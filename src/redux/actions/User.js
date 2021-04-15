import axios from 'axios';
import { signUp as signupUrl, getUser as getUserInfo } from './_api';

export const signUp = user => async dispach => {
  try {
    const { data } = await axios.post(signupUrl, user);
    dispach({
      type: 'USER_SIGNUP',
      payload: data,
      status: 'success',
    });
  } catch ({ response: { data } }) {
    dispach({ type: 'USER_SIGNUP', payload: data, status: 'fail' });
  }
};

export const getUser = (id, token) => async dispach => {
  dispach({ type: 'GET_USER_INFO', status: 'pending' });
  try {
    const { data: { data } } = await axios.get(getUserInfo(id), {
      headers: {
        Authorization: token,
      },
    });
    dispach({
      type: 'GET_USER_INFO',
      payload: data,
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'GET_USER_INFO', payload: error, status: 'fail' });
  }
};
