// Базовые классы
import React, { PropTypes, Component } from 'react';

// Инициаторы действий
import nextRound from './../command/actions/next-round';
import disabledAttr from './utils/disabled-attr';

// Компоненты для отрисовки страницы
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
