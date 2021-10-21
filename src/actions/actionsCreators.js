import {
  ACTIVE_BOARD_NAME,
  NEW_BOARD,
  NEW_LIST,
  CREATE_NEW_BOARD,
  CREATE_NEW_LIST,
  CREATE_NEW_TASK,
  SET_TASK_STATUS,
  ALL_READY,
  ALL_IN_WORK,
  REMOVE_READY,
  REMOVE_LIST,
  REMOVE_BOARD,
  TASK_DRAG_HAPPENED,
} from '../constants';

export const setActiveBoardNameAction = (name) => ({
  type: ACTIVE_BOARD_NAME,
  name,
});

export const setNewBoardAction = (status) => ({
  type: NEW_BOARD,
  status,
});

export const setNewListAction = (status) => ({
  type: NEW_LIST,
  status,
});

export const getBoardsListAction = (boardData) => ({
  type: CREATE_NEW_BOARD,
  boardData,
});

export const createNewListAction = ({ activeBoardId, listData }) => ({
  type: CREATE_NEW_LIST,
  activeBoardId,
  listData,
});

export const createNewTaskAction = ({
  activeBoardId,
  activeTasksListId,
  taskData,
}) => ({
  type: CREATE_NEW_TASK,
  activeBoardId,
  activeTasksListId,
  taskData,
});

export const setTaskStatusAction = ({
  activeBoardId,
  activeTasksListId,
  activeTaskId,
  isCompleted,
}) => ({
  type: SET_TASK_STATUS,
  activeBoardId,
  activeTasksListId,
  activeTaskId,
  isCompleted,
});

export const allReadyAction = ({ activeBoardId, activeTasksListId }) => ({
  type: ALL_READY,
  activeBoardId,
  activeTasksListId,
});

export const allInWorkAction = ({ activeBoardId, activeTasksListId }) => ({
  type: ALL_IN_WORK,
  activeBoardId,
  activeTasksListId,
});

export const removeReadyAction = ({ activeBoardId, activeTasksListId }) => ({
  type: REMOVE_READY,
  activeBoardId,
  activeTasksListId,
});

export const removeListAction = ({ activeBoardId, activeTasksListId }) => ({
  type: REMOVE_LIST,
  activeBoardId,
  activeTasksListId,
});

export const removeBoardAction = ({ activeBoardId }) => ({
  type: REMOVE_BOARD,
  activeBoardId,
});

export const taskDragHappenedAction = ({
  activeBoardId,
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  droppableId,
}) => ({
  type: TASK_DRAG_HAPPENED,
  activeBoardId,
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  droppableId,
});
