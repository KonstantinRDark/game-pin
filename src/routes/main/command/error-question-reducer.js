import update from 'react/lib/update';
import answerReducer from './answer-reducer';
import swapTeamReducer from './swap-team-reducer';
import { MAX_ERRORS } from './constants';

export default (state) => {
  const hasFirst = state.teams[0].id === state.team.id;

  let { errors:[ firstErrors, secondErrors], ...round } = state.round;
  const errors = hasFirst ? firstErrors : secondErrors;

  if ((firstErrors + 1) >= MAX_ERRORS && (secondErrors + 1) >= MAX_ERRORS) {
    // У команд больше нет попыток - конец раунда
    return answerReducer(state);
  }

  if (errors === (MAX_ERRORS - 1)) {
    // Команда ошиблась последний раз - переход хода
    const { team, teams } = swapTeamReducer(state);
    round = {
      errors: [
        (hasFirst ? MAX_ERRORS : firstErrors),
        (!hasFirst ? MAX_ERRORS : secondErrors)
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
