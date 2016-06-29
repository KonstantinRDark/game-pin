import selectTeamReducer from './select-team-reducer';

export default (state) => {
  const { team, teams } = state;
  let payload = teams[0].id !== team.id ? teams[0] : teams[1];

  return selectTeamReducer(state, payload);
};
