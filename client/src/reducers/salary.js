import {
  ADD_SALARY,
  DELETE_SALARY,
  GET_SALARIES,
  GET_SALARY,
  SALARY_ERROR,
} from '../actions/types';

const initialState = {
  salaries: [],
  salary: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_SALARY:
      return {
        ...state,
        salaries: [payload, ...state.salaries],
        loading: false,
      };
    case GET_SALARY:
      return {
        ...state,
        salary: payload,
        loading: false,
      };
    case GET_SALARIES:
      return {
        ...state,
        salaries: payload,
        loading: false,
      };
    case DELETE_SALARY:
      return {
        ...state,
        salaries: state.salaries.filter((salary) => salary._id !== payload),
        loading: false,
      };

    case SALARY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
