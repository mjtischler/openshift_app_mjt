import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE
} from './types';

export const authenticate = (loginInfo) => async (dispatch) => {
  try {
    const { username, password } = loginInfo;

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const status = await response.json();

    if (status && status.token) {
      dispatch({
        type: AUTHENTICATE_SUCCESS,
        token: status.token,
        isAuthenticated: true
      });
    } else if (status && status.message === 'Login Failed!') {
      dispatch({
        type: AUTHENTICATE_FAILURE,
        token: null,
        isAuthenticated: false,
        err: status.message
      });
    } else {
      dispatch({
        type: AUTHENTICATE_FAILURE,
        token: null,
        isAuthenticated: false,
        err: 'Login Attempt Failed!'
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATE_FAILURE,
      token: null,
      isAuthenticated: false,
      err
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await fetch('/api/logout');
    const status = await response.json();

    if (status && !status.loggedIn) {
      dispatch({
        type: LOGOUT_SUCCESS,
        token: null,
        isAuthenticated: false
      });
    } else {
      dispatch({
        type: LOGOUT_FAILURE,
        token: null,
        isAuthenticated: false,
        err: 'Logout Attempt Failed!'
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAILURE,
      token: null,
      isAuthenticated: false,
      err
    });
  }
};

export const getData = (token) => async (dispatch) => {
  try {
    const response = await fetch('/api/data', {
      method: 'GET',
      headers: {
        token
      }
    });
    const status = await response.json();

    if (status && status.data && status.data !== 'Access Denied') {
      dispatch({
        type: GET_DATA_SUCCESS,
        data: status.data
      });
    } else if (status.data === 'Access Denied') {
      dispatch({
        type: GET_DATA_FAILURE,
        data: status.data,
        err: status.data
      });
    } else {
      dispatch({
        type: GET_DATA_FAILURE,
        data: null,
        err: 'Unknown error occurred'
      });
    }
  } catch (err) {
    dispatch({
      type: GET_DATA_FAILURE,
      data: null,
      err
    });
  }
};
