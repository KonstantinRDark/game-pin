import React, { Component } from 'react';
import Questions from './components/questions';
import Scoreboard from './components/scoreboard';
import Team from './components/team';
import Score from './components/score';
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
          <div className='scores' style={ { position: 'absolute', left: '-200px', width: '150px' } }>
            <Score score={ leftTeam.score }/>
          </div>
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
          <div className='scores' style={ { position: 'absolute', right: '-200px', width: '150px' } }>
            <Score score={ rightTeam.score }/>
          </div>
        </div>
      </div>
    );
  }
}
