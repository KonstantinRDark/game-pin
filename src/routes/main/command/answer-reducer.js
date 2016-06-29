import update from 'react/lib/update';
import { STATE_ANSWER } from './constants';

export default (state) => {
  return update(state, {
    state: { $set: STATE_ANSWER }
  });
};
