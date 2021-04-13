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
