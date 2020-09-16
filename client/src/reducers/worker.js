import {
  GET_WORKER,
  GET_WORKERS,
  ADD_WORKER,
  DELETE_WORKER,
  UPDATE_WORKER,
  WORKER_ERROR,
} from '../actions/types';

const initialState = {
  workers: [],
  worker: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_WORKER:
      return {
        ...state,
        workers: [payload, ...state.workers],
        loading: false,
      };
    case GET_WORKER:
      return {
        ...state,
        worker: payload,
        loading: false,
      };
    case GET_WORKERS:
      //console.log(payload);
      return {
        ...state,
        workers: payload,
        loading: false,
      };
    case DELETE_WORKER:
      return {
        ...state,
        workers: state.workers.filter((worker) => worker._id !== payload),
        loading: false,
      };

    case WORKER_ERROR:
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
