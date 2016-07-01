import React, { PropTypes, Component } from 'react';
import { nextRound } from './../command/action';
import disabledAttr from './utils/disabled-attr';
import Questions from './components/questions';

export default class ControlsAnswer extends Component {
  static propTypes = {
    stateData: PropTypes.object
  };

  nextState = () => this.props.dispatch(nextRound());

  render() {
    const { stateData, dispatch } = this.props;
    const hasAllOpen = stateData.round.questions.every(({ isOpen }) => isOpen);

    return (
      <div>
        <Questions questions={ stateData.round.questions } dispatch={ dispatch }/>
        <button type='button'
                onClick={ this.nextState }
                { ...disabledAttr(!hasAllOpen) }
        >Следующий раунд</button>
      </div>
    );
  }
}
