/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { measurements } from './_api';

export const createMeasurement = (body, token) => async dispach => {
  dispach({ type: 'CREATE_MEASUREMENT', status: 'pending' });
  try {
    const { data: { data } } = await axios.post(measurements, body, {
      headers: {
        Authorization: token,
      },
    });
    dispach({
      type: 'CREATE_MEASUREMENT',
      payload: data,
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'CREATE_MEASUREMENT', payload: error, status: 'fail' });
  }
};
