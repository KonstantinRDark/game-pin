import { GAME_DATA } from './routes/main/command/constants';
import mainPageReducer from './routes/main/command/reducer';
import { combineReducers } from 'redux';

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer(asyncReducers) {
  return combineReducers({
    [ GAME_DATA ]: mainPageReducer,
    ...asyncReducers
  });
}
