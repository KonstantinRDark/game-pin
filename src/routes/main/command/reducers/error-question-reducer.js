import update from 'react/lib/update';
import answerReducer from './answer-reducer';
import swapTeamReducer from './swap-team-reducer';
import { MAX_ERRORS } from './../constants';
import hasEndRound from './../utils/has-end-round';

export default (state) => {
  const hasFirst = state.teams[ 0 ].id === state.team.id;

  let { errors:[ firstErrors, secondErrors ], ...round } = state.round;

  hasFirst ? firstErrors++ : secondErrors++;

  const errorTotal = hasFirst ? firstErrors : secondErrors;
  round = {
    errors: [
      firstErrors,
      secondErrors
    ],
    ...round
  };

  if (hasEndRound(Object.assign(state, { round }))) {
    // У команд больше нет попыток - конец раунда
    const { state:nextState } = answerReducer(state);

    return update(state, {
      state: { $set: nextState },
      round: { $set: round }
    });
  }

  if (errorTotal === MAX_ERRORS) {
    // Команда ошиблась последний раз - переход хода
    const { team, teams } = swapTeamReducer(state);

    return update(state, {
      team : { $set: team },
      teams: { $set: teams },
      round: { $set: round }
    });
  }

  return update(state, {
    round: { $set: round }
  });
};
