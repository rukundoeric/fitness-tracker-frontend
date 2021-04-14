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

export const getMeasurements = token => async dispach => {
  dispach({ type: 'GET_MEASUREMENTS', status: 'pending' });
  try {
    const { data: { data } } = await axios.get(measurements, {
      headers: {
        Authorization: token,
      },
    });
    dispach({
      type: 'GET_MEASUREMENTS',
      payload: data.measurements,
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'GET_MEASUREMENTS', payload: error, status: 'fail' });
  }
};
