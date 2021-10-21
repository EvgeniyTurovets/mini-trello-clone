import {
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

const initialState = JSON.parse(localStorage.getItem('boardsList')) || [];

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_BOARD: {
      const { boardData } = action;

      return [...state, boardData];
    }
    case CREATE_NEW_LIST: {
      const { activeBoardId, listData } = action;

      return state.map((board) => {
        if (board.boardId === activeBoardId) {
          return {
            ...board,
            data: [...board.data, listData],
          };
        }
        return board;
      });
    }
    case CREATE_NEW_TASK: {
      const { activeBoardId, activeTasksListId, taskData } = action;

      return state.map((board) => {
        if (board.boardId === activeBoardId) {
          return {
            ...board,
            data: board.data.map((list) => {
              if (list.listId === activeTasksListId) {
                return {
                  ...list,
                  tasks: [...list.tasks, taskData],
                };
              }
              return list;
            }),
          };
        }
        return board;
      });
    }
    case SET_TASK_STATUS: {
      const {
        activeBoardId,
        activeTasksListId,
        activeTaskId,
        isCompleted,
      } = action;

      return state.map((board) => {
        if (board.boardId === activeBoardId) {
          return {
            ...board,
            data: board.data.map((list) => {
              if (list.listId === activeTasksListId) {
                return {
                  ...list,
                  tasks: list.tasks.map((task) => {
                    if (task.taskId === activeTaskId) {
                      return {
                        ...task,
                        isCompleted,
                      };
                    }
                    return task;
                  }),
                };
              }
              return list;
            }),
          };
        }
        return board;
      });
    }
    case ALL_READY: {
      const { activeBoardId, activeTasksListId } = action;

      return state.map((board) => {
        if (board.boardId === activeBoardId) {
          return {
            ...board,
            data: board.data.map((list) => {
              if (list.listId === activeTasksListId) {
                return {
                  ...list,
                  tasks: list.tasks.map((task) => {
                    return {
                      ...task,
                      isCompleted: true,
                    };
                  }),
                };
              }
              return list;
            }),
          };
        }
        return board;
      });
    }
    case ALL_IN_WORK: {
      const { activeBoardId, activeTasksListId } = action;

      return state.map((board) => {
        if (board.boardId === activeBoardId) {
          return {
            ...board,
            data: board.data.map((list) => {
              if (list.listId === activeTasksListId) {
                return {
                  ...list,
                  tasks: list.tasks.map((task) => {
                    return {
                      ...task,
                      isCompleted: false,
                    };
                  }),
                };
              }
              return list;
            }),
          };
        }
        return board;
      });
    }
    case REMOVE_READY: {
      const { activeBoardId, activeTasksListId } = action;

      return state.map((board) => {
        if (board.boardId === activeBoardId) {
          return {
            ...board,
            data: board.data.map((list) => {
              if (list.listId === activeTasksListId) {
                return {
                  ...list,
                  tasks: list.tasks.filter((task) => {
                    return task.isCompleted === false;
                  }),
                };
              }
              return list;
            }),
          };
        }
        return board;
      });
    }
    case REMOVE_LIST: {
      const { activeBoardId, activeTasksListId } = action;

      return state.map((board) => {
        if (board.boardId === activeBoardId) {
          return {
            ...board,
            data: board.data.filter((list) => {
              return list.listId !== activeTasksListId;
            }),
          };
        }
        return board;
      });
    }
    case REMOVE_BOARD: {
      const { activeBoardId } = action;

      return state.filter((board) => {
        return board.boardId !== activeBoardId;
      });
    }
    case TASK_DRAG_HAPPENED: {
      const {
        activeBoardId,
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        droppableId,
      } = action;

      return state.map((board) => {
        if (board.boardId === activeBoardId) {
          const droppableTask = board.data
            .find((list) => list.listId === droppableIdStart)
            .tasks.find((task) => task.taskId === droppableId);

          return {
            ...board,
            data: board.data.map((list) => {
              const newTasks = list.tasks.slice();

              if (
                list.listId === droppableIdStart &&
                droppableIdStart === droppableIdEnd
              ) {
                newTasks.splice(droppableIndexStart, 1);
                newTasks.splice(droppableIndexEnd, 0, droppableTask);

                return {
                  ...list,
                  tasks: newTasks,
                };
              }
              if (list.listId === droppableIdStart) {
                newTasks.splice(droppableIndexStart, 1);

                return {
                  ...list,
                  tasks: newTasks,
                };
              }
              if (list.listId === droppableIdEnd) {
                newTasks.splice(droppableIndexEnd, 0, droppableTask);

                return {
                  ...list,
                  tasks: newTasks,
                };
              }
              return list;
            }),
          };
        }
        return board;
      });
    }
    default:
      return state;
  }
};
