import React, { useReducer, createContext } from 'react';

import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('tasks')) || [
  {
    category: 'Deposits',
    type: 'Work',
    date: '2021-01-31',
    id: 'e394a021-a0b9-4058-a7e3-19dca586ae42',
  },
  {
    category: 'Cook',
    type: 'Personal',
    date: '2021-02-04',
    id: '4cf87e56-13cc-4bc5-9cfa-7a5f88a9c9b7',
  },
  {
    category: 'Meeting',
    type: 'Work',
    date: '2021-02-03',
    id: '456d08a1-4adc-43eb-9baf-b00d9acf33ac',
  },
];

export const TaskTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [tasks, dispatch] = useReducer(contextReducer, initialState);

  //   Action Creators
  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: id });
  const addTask = (task) => dispatch({ type: 'ADD_TASK', payload: task });

  return (
    <TaskTrackerContext.Provider value={{ deleteTask, addTask, tasks }}>
      {children}
    </TaskTrackerContext.Provider>
  );
};
