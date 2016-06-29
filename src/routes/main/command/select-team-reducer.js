import update from 'react/lib/update';
import { STATE_CHECK, STATE_GAME } from './constants';

export default (state, nextTeam) => {
  let { team:nowTeam, teams } = state;
  let params = {
    team: { $set: !!nextTeam ? { ...nextTeam } : null }
  };

  if (!!nowTeam) {
    let hasFirst = teams[0].id == nowTeam.id;

    params.teams = { $set: [
      ...(hasFirst ? nowTeam : teams[0]),
      ...(hasFirst ? nowTeam : teams[1])
    ] };
  }

  if (state.state === STATE_CHECK) {
    params.state = { $set: STATE_GAME };
  }

  return update(state, params);
};
