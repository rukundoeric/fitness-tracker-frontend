import { measurements } from './_api';
import request from './_request';

export const createMeasurement = (body, token) => async dispach => {
  dispach({ type: 'CREATE_MEASUREMENT', status: 'pending' });
  try {
    const { data } = await request('post', measurements, token, body);
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
    const { data } = await request('get', measurements, token);
    dispach({
      type: 'GET_MEASUREMENTS',
      payload: data.measurements,
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'GET_MEASUREMENTS', payload: error, status: 'fail' });
  }
};
