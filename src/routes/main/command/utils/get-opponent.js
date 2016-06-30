export default ({ team, teams:[ firstTeam, secondTeam ] }) => {
  return firstTeam.id === team.id ? secondTeam : firstTeam;
};
