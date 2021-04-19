import { thingsToMeasure, thingToMeasure } from './_api';
import request from './_request';

export const createThingToMeasure = (body, token) => async dispach => {
  try {
    const data = await request('post', thingsToMeasure, token, body);
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
  dispach({ type: 'GET_THINGS_TO_MEASURE', status: 'pending' });
  try {
    const { data } = await request('get', thingsToMeasure, token);
    dispach({
      type: 'GET_THINGS_TO_MEASURE',
      payload: data.things_to_measure,
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'GET_THINGS_TO_MEASURE', payload: error, status: 'fail' });
  }
};

export const getThingToMeasure = (token, id) => async dispach => {
  dispach({ type: 'GET_THING_TO_MEASURE', status: 'pending' });
  try {
    const { data } = await request('get', thingToMeasure(id), token);
    dispach({
      type: 'GET_THING_TO_MEASURE',
      payload: data,
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'GET_THING_TO_MEASURE', payload: error, status: 'fail' });
  }
};
