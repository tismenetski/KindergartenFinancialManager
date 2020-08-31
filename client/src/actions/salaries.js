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
export const getSalary = (workerId, salaryId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/workers/${workerId}/salaries/${salaryId}`
    );

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
  let auth = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.token}`,
    },
  };
  try {
    const res = await axios.get('/api/salaries', config);

    dispatch({
      type: GET_SALARIES,
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

export const deleteSalary = (workerId, salaryId) => async (dispatch) => {
  try {
    await axios.delete(`/api/workers/${workerId}/salaries/${salaryId}`);

    dispatch({
      type: DELETE_SALARY,
      payload: salaryId,
    });

    dispatch(setAlert('Post Removed', 'success'));
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
