import {
  ACTION_OPEN_QUESTION
} from './../constants';


export default (row) => dispatch => dispatch({
  type   : ACTION_OPEN_QUESTION,
  payload: row
});