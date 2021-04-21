import { progress } from './_api';
import request from './_request';

const generateSeries = data => Object.keys(data).map(objKey => ({
  name: objKey,
  data: data[objKey].map(item => Number(item.value)),
}));

export default token => async dispach => {
  dispach({ type: 'GET_PROGRESS_REPORT', status: 'pending' });
  try {
    const { data } = await request('get', progress, token);
    dispach({
      type: 'GET_PROGRESS_REPORT',
      payload: {
        rReport: data.progress_report,
        sReport: generateSeries(data.progress_report),
      },
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'GET_PROGRESS_REPORT', payload: error, status: 'fail' });
  }
};
