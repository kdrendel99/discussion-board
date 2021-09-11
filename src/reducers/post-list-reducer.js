import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { title, body, id } = action;
  switch (action.type) {
  case c.ADD_POST:
    return Object.assign({}, state, {
      [id]: {
        title: title,
        body: body,
        id: id
      }
    });
  case c.DELETE_POST:
    let newState = { ...state };
    delete newState[id];
    return newState;
  default:
    return state;
  }
};