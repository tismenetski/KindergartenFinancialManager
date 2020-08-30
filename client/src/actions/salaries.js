import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_SALARY,
  GET_SALARIES,
  ADD_SALARY,
  DELETE_SALARY,
  SALARY_ERROR,
} from './types';

//ADD Salary
export const addSalary = (FormData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/salaries', FormData, config);

    dispatch({
      type: ADD_SALARY,
      payload: res.data,
    });

    dispatch(setAlert('Salary Added', 'success'));
  } catch (error) {
    dispatch({
      type: SALARY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//GET salary by ID
export const getSalary = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/salaries/${id}`);

    dispatch({
      type: GET_SALARY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SALARY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getSalaries = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/salaries');

    dispatch({
      type: GET_SALARIES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SALARY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteSalary = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/salaries/${id}`);

    dispatch({
      type: DELETE_SALARY,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (error) {
    dispatch({
      type: SALARY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
