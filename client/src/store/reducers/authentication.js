import {
  AUTHENTICATE_SUCCESS,
  LOGOUT_SUCCESS,
  AUTHENTICATE_FAILURE,
  LOGOUT_FAILURE
} from '../actions/types';

export const initialAuthenticationState = {};

const authenticationReducer = (state = initialAuthenticationState, action) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return { ...state, token: action.token, isAuthenticated: action.isAuthenticated, err: null };
    case AUTHENTICATE_FAILURE:
      return { ...state, token: action.token, isAuthenticated: action.isAuthenticated, err: action.err };
    case LOGOUT_SUCCESS:
      return { ...state, token: action.token, isAuthenticated: action.isAuthenticated, err: null };
    case LOGOUT_FAILURE:
      return { ...state, token: action.token, isAuthenticated: action.isAuthenticated, err: action.err };
    default:
      return state;
  }
};

export { authenticationReducer };
