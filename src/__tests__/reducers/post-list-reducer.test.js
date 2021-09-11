import postListReducer from '../../reducers/post-list-reducer';
import * as c from '../../actions/ActionTypes';

describe('postListReducer', () => {

  let action;

  const currentState = {
    1: {title: 'My test post',
    body: 'body test post 1',
    id: 1 },
    2: {title: 'My test post 2',
    body: 'body test post 2',
    id: 2 }
    }

    const postData = {
      title: 'My test post',
      body: 'body test post 1',
      id: 1
    };


  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(postListReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully add new post data to masterpostList', () => {
    const { title, body, id } = postData;
    action = {
      type: c.ADD_POST,
      title: title,
      body: body,
      id: id
    };

    expect(postListReducer({}, action)).toEqual({
      [id] : {
        title: title,
        body: body,
        id: id
      }
    });
  });

  test('Should successfully delete a post', () => {
    action = {
      type: c.DELETE_POST,
      id: 1
    };
    expect(postListReducer(currentState, action)).toEqual({
      2: {title: 'My test post 2',
      body: 'body test post 2',
      id: 2 }
    });
  });
});
