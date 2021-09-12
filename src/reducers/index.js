import formVisibleReducer from './form-visible-reducer';
import postListReducer from './post-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterPostList: postListReducer,
  firestore: firestoreReducer
});

export default rootReducer;