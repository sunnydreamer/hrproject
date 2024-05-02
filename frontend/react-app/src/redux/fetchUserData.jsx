import { setUserObject } from "./redux";

export const fetchData = () => (dispatch, getState) => {
  fetch('http://localhost:3000/user/fetch', {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(data => {
      return dispatch(setUserObject(data))
    })
    .catch(error => console.error('Error:', error));
};
