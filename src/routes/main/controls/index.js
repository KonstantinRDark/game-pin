import React, { Component } from 'react';
import { GAME_DATA, STATE_CHECK, STATE_GAME, STATE_ANSWER, STATE_WINNER } from './../command/constants';
import { connect } from 'react-redux';
import ControlsInit from './controls-init';
import ControlsSelectTeam from './controls-select-team';
import ControlsGame from './controls-game';
import ControlsAnswer from './controls-answer';
import ControlsWinner from './controls-winner';

@connect(({ [ GAME_DATA ]:stateData }) => ({ stateData }))
export default class Controls extends Component {

  render() {
    const { className, stateData } = this.props;
    let Content;

    switch (stateData.state) {
      case STATE_WINNER:
        Content = ControlsWinner;
        break;
      case STATE_ANSWER:
        Content = ControlsAnswer;
        break;
      case STATE_GAME:
        Content = ControlsGame;
        break;
      case STATE_CHECK:
        Content = ControlsSelectTeam;
        break;
      default:
        Content = ControlsInit;
    }

    return (
      <div className={ `game-controls ${ className }` }>
        <Content { ...this.props }/>
      </div>
    );
  }

}
