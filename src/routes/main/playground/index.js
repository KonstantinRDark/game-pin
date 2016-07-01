import React, { Component } from 'react';
import { GAME_DATA, STATE_CHECK, STATE_GAME, STATE_ANSWER, STATE_WINNER } from './../command/constants';
import { connect } from 'react-redux';
import Questions from './questions';
import Scoreboard from './scoreboard';
import Team from './team';
import './playground.less';

@connect(({ [ GAME_DATA ]:stateData }) => ({ stateData }))
export default class Playground extends Component {
  render() {
    const { className, stateData: { state } } = this.props;
    let Content;

    switch (state) {
      case STATE_WINNER: Content = this.renderWinner();
        break;
      case STATE_ANSWER:
      case STATE_GAME:
      case STATE_CHECK: Content = this.renderGame();
        break;
      default: Content = this.renderInit();
    }

    return (
      <div className={ `playground ${ className }` }>
        { Content }
      </div>
    );
  }

  renderWinner() {
    const { stateData } = this.props;

    return (
      <div>
        STATE: { stateData.state }
      </div>
    );
  }

  renderGame() {
    const { stateData: {
      state,
      team,
      teams: [ leftTeam, rightTeam ],
      round: { score, number: roundNumber, questions, errors: [ leftErrors, rightErrors ] }
    } } = this.props;

    return (
      <div className='game'>
        <Scoreboard className='score-row' score={ score }/>
        <div className='game-row'>
          <Team className='column-left'
                round={ roundNumber }
                active={ team }
                team={ leftTeam }
                errors={ leftErrors }/>
          <Questions className='column-center' questions={ questions }/>
          <Team className='column-right'
                round={ roundNumber }
                active={ team }
                team={ rightTeam }
                errors={ rightErrors }/>
        </div>
      </div>
    );
  }

  renderCheckTeam() {
    const { stateData } = this.props;

    return (
      <div>
        STATE: { stateData.state }
      </div>
    );
  }

  renderInit() {
    const { stateData } = this.props;

    return (
      <div>
        STATE: { stateData.state }
      </div>
    );
  }
}
