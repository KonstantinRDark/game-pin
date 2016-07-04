import update from 'react/lib/update';
import { STATE_CHECK, STATE_GAME } from './../constants';

export default (state, nextTeam) => {
  let { team:nowTeam, teams: [ firstTeam, secondTeam ] } = state;
  let params = {
    team: { $set: !!nextTeam ? { ...nextTeam } : null }
  };

  if (!!nowTeam) {
    let hasFirst = firstTeam.id == nextTeam.id;

    params.teams = { $set: [
      { ...(hasFirst ? nextTeam : firstTeam) },
      { ...(hasFirst ? secondTeam : nextTeam) }
    ] };
  }

  if (state.state === STATE_CHECK) {
    params.state = { $set: STATE_GAME };
  }

  return update(state, params);
};
