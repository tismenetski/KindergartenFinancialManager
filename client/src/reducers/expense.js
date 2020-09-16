import {
  ADD_EXPENSE,
  GET_EXPENSE,
  GET_EXPENSES,
  DELETE_EXPENSE,
  EXPENSE_ERROR,
} from '../actions/types';

const initialState = {
  expenses: [],
  singleExpense: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_EXPENSE:
      return {
        ...state,
        salaries: [payload, ...state.expenses],
        loading: false,
      };
    case GET_EXPENSE:
      return {
        ...state,
        singleExpense: payload,
        loading: false,
      };
    case GET_EXPENSES:
      //console.log(payload);
      return {
        ...state,
        expenses: payload,
        loading: false,
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense._id !== payload),
        loading: false,
      };

    case EXPENSE_ERROR:
      console.log(payload);
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
