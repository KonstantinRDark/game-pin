import {
  ACTION_START_GAME,
  ACTION_SELECT_TEAM,
  ACTION_OPEN_ROW,
  ACTION_NEXT_ROUND,
  ACTION_SWAP_TEAM,
  ACTION_ERROR_QUESTION,
  ACTION_ANSWER
} from './constants';

export const startGame = (data) => dispatch => {
  dispatch({
    type: ACTION_START_GAME,
    payload: {
      rounds: [
        {
          name: 'Раунд 1',
          questions: [
            { name: 'Иммунитет', score: 27 },
            { name: 'Здоровый образ жизни', score: 17 },
            { name: 'Марлевые повязки', score: 11 },
            { name: 'Прививки', score: 10 },
            { name: 'Закалка', score: 7 },
            { name: 'Витамины', score: 5 }
          ]
        },
        {
          name: '2',
          questions: [
            { name: 'Раунд 2 Вопрос 1', score: 6 },
            { name: 'Раунд 2 Вопрос 2', score: 5 },
            { name: 'Раунд 2 Вопрос 3', score: 4 },
            { name: 'Раунд 2 Вопрос 4', score: 3 },
            { name: 'Раунд 2 Вопрос 5', score: 2 },
            { name: 'Раунд 2 Вопрос 6', score: 1 }
          ]
        }
      ],
      teams: [
        { id: 1, name: 'red', score: 0 },
        { id: 2, name: 'blue', score: 0 }
      ]
    }
  });
};

export const selectTeam = (team) => dispatch => {
  dispatch({
    type: ACTION_SELECT_TEAM,
    payload: team
  });
};

export const showRow = (row) => dispatch => {
  dispatch({
    type: ACTION_OPEN_ROW,
    payload: row
  });
};

export const nextRound = () => dispatch => {
  dispatch({
    type: ACTION_NEXT_ROUND,
    payload: {}
  });
};

export const setError = () => dispatch => {
  dispatch({
    type: ACTION_ERROR_QUESTION,
    payload: {}
  });
};

export const answer = () => dispatch => {
  dispatch({
    type: ACTION_ANSWER,
    payload: {}
  });
};

export const toggleTeam = () => dispatch => {
  dispatch({
    type: ACTION_SWAP_TEAM,
    payload: {}
  });
};
