'use strict';
import {
  STATE_INIT,
  ACTION_START_GAME,
  ACTION_SELECT_TEAM,
  ACTION_SWAP_TEAM,
  ACTION_OPEN_ROW,
  ACTION_ERROR_QUESTION,
  ACTION_NEXT_ROUND,
  ACTION_ANSWER,
  ACTION_SHOW_WINNER
} from './constants';
import startGameReducer from './start-game-reducer';
import selectTeamReducer from './select-team-reducer';
import swapTeamReducer from './swap-team-reducer';
import openRowReducer from './open-row-reducer';
import errorQuestionReducer from './error-question-reducer';
import nextRoundReducer from './next-round-reducer';
import answerReducer from './answer-reducer';
import showWinnerReducer from './show-winner-reducer';

const init = {
  state: STATE_INIT,
  rounds: [],
  teams: [],
  team: null,
  round: null,
  winner: null
};

export default function (state = init, { type, payload }) {
  switch (type) {
    case ACTION_START_GAME:
      return startGameReducer(state, payload);

    // Выбрать команду которая отвечает сейчас
    case ACTION_SELECT_TEAM:
      return selectTeamReducer(state, payload);

    // Переход хода к другой команде
    case ACTION_SWAP_TEAM:
      return swapTeamReducer(state);

    // Открыть строку
    case ACTION_OPEN_ROW:
      return openRowReducer(state, payload);

    // Отвечающая команда ошиблась
    case ACTION_ERROR_QUESTION:
      return errorQuestionReducer(state);

    // Следующий раунд
    case ACTION_ANSWER:
      return answerReducer(state);
    
    // Следующий раунд
    case ACTION_NEXT_ROUND:
      return nextRoundReducer(state);

    // Показать победителя
    case ACTION_SHOW_WINNER:
      return showWinnerReducer(state);

    default:
      return state;
  }
};
