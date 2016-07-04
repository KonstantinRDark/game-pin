// Базовые классы
import React, { PropTypes, Component } from 'react';

// Инициаторы действий
import startGame from './../command/actions/start-game';

export default class ControlsInit extends Component {
  static propTypes = {
    stateData: PropTypes.object,
    dispatch : PropTypes.func
  };

  nextState = () => this.props.dispatch(startGame());

  render() {
    return (
      <div>
        <button type='button' onClick={ this.nextState }>Начать игру</button>
      </div>
    );
  }
}
