import update from 'react/lib/update';
import { STATE_GAME } from './../constants';
import answerReducer from './answer-reducer';
import hasEndRound from './../utils/has-end-round';

export default (state, payload) => {
  // Открыть строку
  // Добавить очки в текущий раунд если идет игра
  let { questions, score, errors, ...round } = state.round;

  if (state.state === STATE_GAME) {
    score += payload.score * state.round.number;
  }

  round = {
    ...round,
    score,
    errors   : [ ...errors ],
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
  };
  
  if (hasEndRound(Object.assign(state, { round }))) {
    // У команд больше нет попыток - конец раунда
    const { state:nextState } = answerReducer(state);

    return update(state, {
      state: { $set: nextState },
      round: { $set: round }
    });
  }

  return update(state, { round: { $set: round } });
};
