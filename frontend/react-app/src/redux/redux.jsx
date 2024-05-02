import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const SET_USER_OBJECT = "SET_USER_OBJECT";

// Action Creator
export const setUserObject = (data) => {
  return {
    type: SET_USER_OBJECT,
    payload: data
  }
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_OBJECT:
      console.log("setting user object");
      return {
        ...state,
        payload: action.payload
      };
    default:
      return state;
  }
}

const store = createStore(
  userReducer,
  applyMiddleware(thunk)
);

export default store;
