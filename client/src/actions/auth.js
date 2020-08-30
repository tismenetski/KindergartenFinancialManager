import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

//Load User

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger'))); // in case we have errors we want to show them to the user using our setAlert
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout  / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

//Register

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data, //res.data is the token being sent to us back from the server
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger'))); // in case we have errors we want to show them to the user using our setAlert
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
