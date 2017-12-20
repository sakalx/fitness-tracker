import actionTypes from './actionTypes';

export const receiveEntries = entries => ({
  type: actionTypes.RECEIVE,
  payload: entries,
});

export const addEntry = entry => ({
  type: actionTypes.ADD,
  payload: entry,
});
