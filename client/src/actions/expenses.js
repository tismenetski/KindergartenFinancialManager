import axios from 'axios';
import { setAlert } from './alert';
import { EXPENSE_ERROR, ADD_EXPENSE, GET_EXPENSES } from './types';

export const getExpenses = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.token}`,
    },
  };
  try {
    const res = await axios.get('/api/expenses', config);
    dispatch({
      type: GET_EXPENSES,
      payload: res.data.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: EXPENSE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//ADD Expense
export const addExpense = (FormData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/expenses', FormData, config);
    console.log(res);
    dispatch({
      type: ADD_EXPENSE,
      payload: res.data,
    });

    dispatch(setAlert('Expense Added', 'success'));
  } catch (error) {
    console.error(error);
    dispatch({
      type: EXPENSE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
