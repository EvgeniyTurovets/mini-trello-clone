import { NEW_BOARD } from '../constants';

const initialState = false;

export default (state = initialState, { type, status }) => {
  switch (type) {
    case NEW_BOARD:
      return status;
    default:
      return state;
  }
};
