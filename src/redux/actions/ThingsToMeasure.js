import axios from 'axios';
import { thingsToMeasure } from './_api';

export const createThingToMeasure = (body, token) => async dispach => {
  dispach({ type: 'CREATE_THING_TO_MEASURE', status: 'pending' });
  try {
    const { data } = await axios.post(thingsToMeasure, body, {
      headers: {
        Authorization: token,
      },
    });
    dispach({
      type: 'CREATE_THING_TO_MEASURE',
      payload: data,
      status: 'success',
    });
  } catch ({ response: { data } }) {
    dispach({ type: 'CREATE_THING_TO_MEASURE', payload: data, status: 'fail' });
  }
};

export const ttReset = () => async dispach => {
  dispach({ type: 'T_T_M_RESET' });
};

export const getThingsToMeasure = token => async dispach => {
  // dispach({ type: 'GET_THINGS_TO_MEASURE', status: 'pending' });
  try {
    const { data: { data } } = await axios.get(thingsToMeasure, {}, {
      headers: {
        Authorization: token,
      },
    });
    console.log('data', data);
    dispach({
      type: 'GET_THINGS_TO_MEASURE',
      payload: data.things_to_measures,
      status: 'success',
    });
  } catch ({ response: { data } }) {
    console.log('error', data);
    dispach({ type: 'GET_THINGS_TO_MEASURE', payload: data, status: 'fail' });
  }
};
