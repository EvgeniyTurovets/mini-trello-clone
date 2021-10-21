import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import activeBoardName from './activeBoardName';
import newBoard from './newBoard';
import newList from './newList';
import boardsList from './boardsList';

export default combineReducers({
  activeBoardName,
  newBoard,
  newList,
  boardsList,
  form: formReducer,
});
