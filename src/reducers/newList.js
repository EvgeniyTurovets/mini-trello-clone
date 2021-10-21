import { NEW_LIST } from '../constants';

const initialState = false;

export default (state = initialState, { type, status }) => {
  switch (type) {
    case NEW_LIST:
      return status;
    default:
      return state;
  }
};
