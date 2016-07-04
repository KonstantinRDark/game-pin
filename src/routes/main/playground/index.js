// Базовые классы
import React, { Component } from 'react';
import { GAME_DATA, STATE_CHECK, STATE_GAME, STATE_ANSWER, STATE_WINNER } from './../command/constants';
import { connect } from 'react-redux';

// Компоненты для отрисовки страницы
import PlaygroundInit from './playground-init';
import PlaygroundGame from './playground-game';
import PlaygroundWinner from './playground-winner';

// Стили
import './playground.less';

@connect(({ [ GAME_DATA ]:stateData }) => ({ stateData }))
export default class Playground extends Component {
  render() {
    const { className, stateData } = this.props;
    const { state } = stateData;
    let content;

    switch (state) {
      case STATE_WINNER:
        content = (<PlaygroundWinner stateData={ stateData }/>);
        break;
      case STATE_ANSWER:
      case STATE_GAME:
      case STATE_CHECK:
        content = (<PlaygroundGame stateData={ stateData }/>);
        break;
      default: 
        content = (<PlaygroundInit stateData={ stateData }/>);
    }

    return (
      <div className={ `playground ${ className }` }>
        { content }
      </div>
    );
  }
}
