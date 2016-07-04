import {
  ACTION_NEXT_ROUND
} from './../constants';

export default () => dispatch => dispatch({
  type   : ACTION_NEXT_ROUND,
  payload: {}
});