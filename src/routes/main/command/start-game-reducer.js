import update from 'react/lib/update';
import { STATE_CHECK } from './constants';
const getRound = ({ name, score = 0, questions }) => ({
  name,
  score,
  questions: questions.map(question => ({ ...question, isOpen: false })),
  errors: [ 0, 0 ]
});

export default (state, payload) => {
  let rounds = payload.rounds.map((round, number) => Object.assign(getRound(round), { number: number + 1 }));
  let round = rounds.shift();

  return update(state, {
    state: { $set: STATE_CHECK },
    rounds: { $set: rounds },
    teams: { $set: payload.teams.map(team => ({ ...team, score: 0 })) },
    team: { $set: null },
    round: { $set: { ...round, number: 1 } }
  });
};
