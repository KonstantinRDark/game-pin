import { MAX_ERRORS } from './../constants';
import getOpponentErrors from './get-opponent-errors';

/**
 * Пределяет что можно перевести игру только в состояние ответов
 */
export default (state) => {
  const { team, round: { questions } } = state;
  // Определяем что у текущей команды есть открытый ответ и у команды соперника три ошибки
  const opponentErrors = getOpponentErrors(state);
  const hasSingleForActive = questions.some(({ isOpen, team:{ id } = {} }) => isOpen && id === team.id);
  return opponentErrors === MAX_ERRORS && hasSingleForActive;
};
