import React, { Component } from 'react';
import Questions from './components/questions';
import Scoreboard from './components/scoreboard';
import Team from './components/team';
import './playground.less';

export default class PlaygroundGame extends Component {
  render() {
    const { stateData: {
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
}
