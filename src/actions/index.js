import * as c from './ActionTypes';
//ACTION CREATORS

export const deletePost = id => ({
  type: 'DELETE_POST',
  id
});

export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});

export const addPost = (post) => {
  const { title, body, id } = post;
  return {
    type: c.ADD_POST,
    title: title,
    body: body,
    id: id
  }
}