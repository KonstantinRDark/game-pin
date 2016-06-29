import update from 'react/lib/update';
import swapTeamReducer from './swap-team-reducer';

export default (state) => {
  const hasFirst = state.teams[0] !== state.team;

  let { errors:[ firstErrors, secondErrors], ...round } = state.round;
  const errors = hasFirst ? firstErrors : secondErrors;

  if (errors === 2) {
    // Команда ошиблась последний раз - переход хода
    return Object.assign(swapTeamReducer(state), update(state, {
      round: { $set: {
        errors: [
          (hasFirst ? 3 : firstErrors),
          (hasFirst ? 3 : secondErrors)
        ],
        ...round
      } }
    }));
  }

  return update(state, {
    round: {
      errors: [
        (hasFirst ? ++firstErrors : firstErrors),
        (hasFirst ? ++secondErrors : secondErrors)
      ],
      ...round
    }
  });
};
