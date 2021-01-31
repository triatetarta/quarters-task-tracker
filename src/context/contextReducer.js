const contextReducer = (state, action) => {
  let tasks;
  switch (action.type) {
    case 'DELETE_TASK':
      tasks = state.filter((task) => task.id !== action.payload);

      localStorage.setItem('tasks', JSON.stringify(tasks));

      return tasks;

    case 'ADD_TASK':
      tasks = [action.payload, ...state];

      localStorage.setItem('tasks', JSON.stringify(tasks));

      return tasks;
    default:
      return state;
  }
};

export default contextReducer;
