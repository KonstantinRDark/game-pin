import {
  ACTION_ERROR_QUESTION
} from './../constants';

export default () => dispatch => dispatch({
  type   : ACTION_ERROR_QUESTION,
  payload: {}
});