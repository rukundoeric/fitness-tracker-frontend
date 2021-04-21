import { signUp as signupUrl, getUser as getUserInfo } from './_api';
import request from './_request';

export const signUp = user => async dispach => {
  try {
    const data = await request('post', signupUrl, null, user);
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
    const { data } = await request('get', getUserInfo(id), token);
    dispach({
      type: 'GET_USER_INFO',
      payload: data,
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'GET_USER_INFO', payload: error, status: 'fail' });
  }
};
