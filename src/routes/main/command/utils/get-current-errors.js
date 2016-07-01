export default ({ team, teams:[ firstTeam ], round: { errors: [ firstErrors, secondErrors ] } }) => {
  return firstTeam.id === team.id ? firstErrors : secondErrors;
};
