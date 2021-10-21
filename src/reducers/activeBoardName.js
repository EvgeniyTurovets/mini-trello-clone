import { ACTIVE_BOARD_NAME } from '../constants';

const initialState = 'My Boards';

export default (state = initialState, { type, name }) => {
  switch (type) {
    case ACTIVE_BOARD_NAME:
      return name;
    default:
      return state;
  }
};
