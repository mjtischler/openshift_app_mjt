import { GET_DATA_SUCCESS, GET_DATA_FAILURE, LOGOUT_SUCCESS } from '../actions/types';

export const initialDataState = {};

const dataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case GET_DATA_SUCCESS:
      return { ...state, data: action.data };
    case GET_DATA_FAILURE:
      return { ...state, data: action.data };
    case LOGOUT_SUCCESS:
      return { ...state, data: null };
    default:
      return state;
  }
};

export { dataReducer };
