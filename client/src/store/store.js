import {
  applyMiddleware,
  compose,
  createStore,
  combineReducers
} from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { authenticationReducer } from './reducers/authentication';
import { dataReducer } from './reducers/data';

const logger = createLogger();
const middlewares = [ReduxThunk, logger];

const combinedReducers = combineReducers({
  authenticationReducer,
  dataReducer
});

export const configureStore = (initialState) => {
  const createdStore = createStore(combinedReducers, initialState,
    compose(applyMiddleware(...middlewares)));
  return createdStore;
};

const store = configureStore();

export { store };
