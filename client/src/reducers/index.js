import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import expense from './expense';
import salary from './salary';
import worker from './worker';

export default combineReducers({
  alert,
  auth,
  expense,
  salary,
  worker,
});
