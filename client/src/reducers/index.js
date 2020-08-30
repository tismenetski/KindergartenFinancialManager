import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import expense from './expense';
import salary from './salary';

export default combineReducers({
  alert,
  auth,
  expense,
  salary,
});
