import update from 'react/lib/update';
import { STATE_CHECK, STATE_WINNER } from './constants';
import selectTeamReducer from './select-team-reducer';

export default (state) => {
  let { round, rounds, teams, team } = state;

  // Если следующего раунда нет или текущий статус не STATE_ANSWER - ничего не делаем
  if (!rounds.length || !round.questions.every(question => question.isOpen)) {
    return state;
  }

  let hasFirst = teams[0].id == team.id;

  // Определим какой команде начисялть очки и начислим их
  // Если есть хоть один ответ от текущей команды - начислим им очки
  if (round.questions.some(question => question.isOpen && question.team.id == team.id)) {
    team = { ...team, score: team.score + round.score };
  } else {
    // Иначе начислим им очки другой команде
    team = hasFirst ? teams[0] : teams[1];
    team = { ...team, score: team.score + round.score };
  }

  round = state.rounds.shift();
  rounds = state.rounds.map(round => ({ ...round }));
  let { teams:newTeams } = selectTeamReducer(state, team);

  return update(state, {
    state: { $set: !round ? STATE_WINNER : STATE_CHECK },
    rounds: { $set: rounds },
    team: { $set: null },
    teams: { $set: newTeams },
    winner: { $set: !round ? team : null },
    round: { $set: { ...round } }
  });
};
