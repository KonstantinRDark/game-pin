// Базовые классы
import React, { PropTypes, Component } from 'react';

// Инициаторы действий
import errorQuestion from './../command/actions/error-question';
import hasEndRound from './../command/utils/has-end-round';
import disabledAttr from './utils/disabled-attr';

// Компоненты для отрисовки страницы
import Questions from './components/questions';

export default class ControlsGame extends Component {
  static propTypes = {
    stateData: PropTypes.object,
    dispatch : PropTypes.func
  };

  onSetError = () => this.props.dispatch(errorQuestion());

  render() {
    const { stateData, dispatch } = this.props;

    return (
      <div>
        <Questions questions={ stateData.round.questions } dispatch={ dispatch }/>
        <button type='button'
                onClick={ () => this.onSetError() }
        >Ошибка</button>
      </div>
    );
  }
}
