import React, { PropTypes, Component } from 'react';
import { setError, answer } from './../command/action';
import hasEndRound from './../command/utils/has-end-round';
import disabledAttr from './utils/disabled-attr';
import Questions from './components/questions';

export default class ControlsGame extends Component {
  static propTypes = {
    stateData: PropTypes.object,
    dispatch : PropTypes.func
  };

  onSetError = () => this.props.dispatch(setError());

  nextState = () => this.props.dispatch(answer());

  render() {
    const { stateData, dispatch } = this.props;

    return (
      <div>
        <Questions questions={ stateData.round.questions } dispatch={ dispatch }/>
        <button type='button'
                onClick={ () => this.onSetError() }
        >Ошибка</button>
        <button type='button'
                onClick={ this.nextState }
                { ...disabledAttr(!hasEndRound(stateData)) }
        >Открываем ответы</button>
      </div>
    );
  }
}
