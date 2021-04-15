import axios from 'axios';
import { progress } from './_api';

const generateSeries = data => Object.keys(data).map(objKey => ({
  name: objKey,
  data: data[objKey].map(item => Number(item.value)),
}));

export default token => async dispach => {
  dispach({ type: 'GET_PROGRESS_REPORT', status: 'pending' });
  try {
    const { data: { data } } = await axios.get(progress, {
      headers: {
        Authorization: token,
      },
    });
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
