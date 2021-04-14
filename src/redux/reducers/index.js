import { combineReducers } from 'redux';
import auth from './_auth';
import thingsToMeasure from './_things_to_measure';
import measurements from './_measurements';

export default combineReducers({
  auth,
  measurements,
  thingsToMeasure,
});
