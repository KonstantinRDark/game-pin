import update from 'react/lib/update';
import { STATE_CHECK, STATE_WINNER } from './constants';
import selectTeamReducer from './select-team-reducer';

export default (state) => {
  let { round, rounds, teams, team } = state;
  
  let hasFirst = teams[ 0 ].id == team.id;

  // Определим какой команде начисялть очки и начислим их
  // Если есть хоть один ответ от текущей команды - начислим им очки
  if (round.questions.some(({ isOpen, team:{ id } = {} }) => isOpen && id == team.id)) {
    team = { ...team, score: team.score + round.score };
  } else {
    // Иначе начислим им очки другой команде
    team = hasFirst ? teams[ 0 ] : teams[ 1 ];
    team = { ...team, score: team.score + round.score };
  }

  round = rounds.shift();
  rounds = rounds.map(round => ({ ...round }));
  let { teams:newTeams } = selectTeamReducer(state, team);

  return update(state, {
    state : { $set: !round ? STATE_WINNER : STATE_CHECK },
    rounds: { $set: rounds },
    team  : { $set: null },
    teams : { $set: newTeams },
    winner: { $set: !round ? team : null },
    round : { $set: { ...round } }
  });
};
