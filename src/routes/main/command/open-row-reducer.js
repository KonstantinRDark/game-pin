import update from 'react/lib/update';
import { STATE_GAME } from './constants';

export default (state, payload) => {
  // Открыть строку
  // Добавить очки в текущий раунд если идет игра
  let { questions, score, errors, ...round } = state.round;

  if (state.state === STATE_GAME) {
    score += payload.score * state.round.number;
  }

  return update(state, { round: { $set: {
    ...round,
    score,
    errors: [ ...errors ],
    questions: questions.map(question => {
      let result = { ...question };

      if (question.name === payload.name) {
        result.isOpen = true;

        if (state.state === STATE_GAME) {
          result.team = { ...state.team };
        }
      }

      return result;
    })
  } } });
};
