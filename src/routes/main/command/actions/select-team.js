import {
  ACTION_SELECT_TEAM
} from './../constants';

export default (team) => dispatch => dispatch({
  type   : ACTION_SELECT_TEAM,
  payload: team
});