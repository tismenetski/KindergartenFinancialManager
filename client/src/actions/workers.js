import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_WORKER,
  GET_WORKERS,
  ADD_WORKER,
  DELETE_WORKER,
  UPDATE_WORKER,
  WORKER_ERROR,
} from './types';

export const getWorkers = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.token}`,
    },
  };
  try {
    const res = await axios.get('/api/workers', config);
    console.log(res.data.data);
    dispatch({
      type: GET_WORKERS,
      payload: res.data.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: WORKER_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
