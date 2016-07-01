import { MAX_ERRORS } from './../constants';
import getCurrentErrors from './get-current-errors';
import getOpponentErrors from './get-opponent-errors';

/**
 * Пределяет что можно перевести игру только в состояние ответов
 */
export default (state) => {
  const { team, round: { questions, errors: [ firstErrors, secondErrors ] } } = state;

  // Определяем что у текущей команды есть открытый ответ и у команды соперника три ошибки
  const currentErrors = getCurrentErrors(state);
  const opponentErrors = getOpponentErrors(state);
  const hasSingleForActive = questions.some(({ isOpen, team:{ id } = {} }) => isOpen && id === team.id);
  // Или у обоих команд три ошибки
  const hasAllErrors = (firstErrors) >= MAX_ERRORS && (secondErrors) >= MAX_ERRORS;
  // Или все ответы открыты
  const hasAllQuestionsOpen = questions.every(({ isOpen }) => isOpen);

  return hasAllErrors
    || hasAllQuestionsOpen
    || opponentErrors === MAX_ERRORS && !!currentErrors
    || opponentErrors === MAX_ERRORS && hasSingleForActive;
};
