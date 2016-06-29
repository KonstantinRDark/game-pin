import {
  ACTION_START_GAME,
  ACTION_SELECT_TEAM,
  ACTION_SWAP_TEAM,
  ACTION_OPEN_ROW,
  ACTION_ERROR_QUESTION,
  ACTION_NEXT_ROUND,
  ACTION_SHOW_WINNER,
} from './constants';

export const startGame = (data) => dispatch => {
  dispatch({
    type: ACTION_START_GAME,
    payload: {
      rounds: [
        {
          name: 'Раунд 1',
          questions: [
            { name: 'Раунд 1 Вопрос 1', score: 6 },
            { name: 'Раунд 1 Вопрос 2', score: 5 },
            { name: 'Раунд 1 Вопрос 3', score: 4 },
            { name: 'Раунд 1 Вопрос 4', score: 3 },
            { name: 'Раунд 1 Вопрос 5', score: 2 },
            { name: 'Раунд 1 Вопрос 6', score: 1 }
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
