import { login } from './_api';
import request from './_request';

export const logIn = auth => async dispach => {
  dispach({ type: 'USER_LOGIN', status: 'pending' });
  try {
    const data = await request('post', login, null, auth);
    dispach({
      type: 'USER_LOGIN',
      payload: data,
      status: 'success',
    });
  } catch ({ response: { data } }) {
    dispach({ type: 'USER_LOGIN', payload: data, status: 'fail' });
  }
};

export const logOut = () => async dispach => {
  dispach({
    type: 'USER_LOGOUT',
  });
};
