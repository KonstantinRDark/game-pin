'use strict';

// Загрузка данных для главной страницы
export const GAME_DATA = 'GAME_DATA';
export const MAX_ERRORS = 3;

export const STATE_INIT = 1;
export const STATE_CHECK = 2;
export const STATE_GAME = 3;
export const STATE_ANSWER = 4;
export const STATE_WINNER = 5;

export const ACTION_START_GAME = 'ACTION_CHANGE_STATE';
export const ACTION_SELECT_TEAM = 'ACTION_SELECT_TEAM';
export const ACTION_SWAP_TEAM = 'ACTION_SWAP_TEAM';
export const ACTION_OPEN_ROW = 'ACTION_OPEN_ROW';
export const ACTION_ERROR_QUESTION = 'ACTION_ERROR_QUESTION';
export const ACTION_NEXT_ROUND = 'ACTION_NEXT_ROUND';
export const ACTION_SHOW_WINNER = 'ACTION_SHOW_WINNER';
export const ACTION_ANSWER = 'ACTION_ANSWER';
