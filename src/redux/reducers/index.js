import { combineReducers } from 'redux';
import auth from './_auth';
import thingsToMeasure from './_things_to_measure';
import measurements from './_measurements';
import progress from './_progress';
import user from './_user';

export default combineReducers({
  auth,
  user,
  measurements,
  thingsToMeasure,
  progress,
});
