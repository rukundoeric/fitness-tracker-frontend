import axios from 'axios';
import { login } from './_api';

export const logIn = auth => async dispach => {
  dispach({ type: 'USER_LOGIN', status: 'pending' });
  try {
    const { data } = await axios.post(login, auth);
    // console.log(data);
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
