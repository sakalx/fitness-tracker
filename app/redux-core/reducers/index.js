import actionTypes from '../actions/actionTypes';

function entries(state = {}, action) {
  const {type, payload = {}} = action;
  const upDateState = {
    ...state,
    ...payload
  };
  switch (type) {
    case actionTypes.ADD:
      return upDateState;
    case actionTypes.RECEIVE:
      return upDateState;
  }
  return state;
}

export default entries;