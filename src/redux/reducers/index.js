import { combineReducers } from 'redux';
import auth from './_auth';

export default combineReducers({
  auth,
  measurements: () => ({}),
  thingsToMeasure: () => ({}),
  users: () => ({}),
});
