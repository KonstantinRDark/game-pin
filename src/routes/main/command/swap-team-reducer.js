import selectTeamReducer from './select-team-reducer';

export default (state) => {
  const { team, teams: [ firstTeam, secondTeam ] } = state;
  let payload = firstTeam.id !== team.id ? firstTeam : secondTeam;

  return selectTeamReducer(state, payload);
};
