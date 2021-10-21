import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

export default createStore(rootReducer, persistedState);
