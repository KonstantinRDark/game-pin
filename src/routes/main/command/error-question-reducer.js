import update from 'react/lib/update';
import answerReducer from './answer-reducer';
import swapTeamReducer from './swap-team-reducer';
const maxErrors = 3;

export default (state) => {
  const hasFirst = state.teams[0].id === state.team.id;

  let { errors:[ firstErrors, secondErrors], ...round } = state.round;
  const errors = hasFirst ? firstErrors : secondErrors;

  if ((firstErrors + 1) >= maxErrors && (secondErrors + 1) >= maxErrors) {
    // У команд больше нет попыток - конец раунда
    return answerReducer(state);
  }

  if (errors === (maxErrors - 1)) {
    // Команда ошиблась последний раз - переход хода
    const { team, teams } = swapTeamReducer(state);
    round = {
      errors: [
        (hasFirst ? maxErrors : firstErrors),
        (!hasFirst ? maxErrors : secondErrors)
      ],
      ...round
    };

    return update(state, {
      team: { $set: team },
      teams: { $set: teams },
      round: { $set: round }
    });
  }

  return update(state, {
    round: {
      $set: {
        errors: [
          (hasFirst ? firstErrors + 1 : firstErrors),
          (!hasFirst ? secondErrors + 1 : secondErrors)
        ],
        ...round
      }
    }
  });
};
