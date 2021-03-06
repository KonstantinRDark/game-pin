import {
  ACTION_START_GAME
} from './../constants';

export default (data) => dispatch => dispatch({
  type   : ACTION_START_GAME,
  payload: {
    rounds: [
      {
        name     : 'Раунд 1',
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
        name     : '2',
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
