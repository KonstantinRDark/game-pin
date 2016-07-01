import React, { Component } from 'react';
import { startGame, selectTeam, showRow, nextRound, setError, answer } from './../command/action';
import { GAME_DATA, STATE_CHECK, STATE_GAME, STATE_ANSWER, STATE_WINNER } from './../command/constants';
import { connect } from 'react-redux';
import hasEndRound from './../command/utils/has-end-round';
const disabledAttr = (condition) => {
  let attrs = {};

  if (condition) {
    attrs.disabled = 'disabled';
  }

  return attrs;
};

@connect(({ [ GAME_DATA ]:stateData }) => ({ stateData }))
export default class Controls extends Component {
  onStartGame = () => this.props.dispatch(startGame());
  onSelectTeam = (team) => this.props.dispatch(selectTeam(team));
  onShowRow = (row) => this.props.dispatch(showRow(row));
  onNextRound = () => this.props.dispatch(nextRound());
  onSetError = () => this.props.dispatch(setError());
  onSetAnswer = () => this.props.dispatch(answer());

  render() {
    const { className, stateData: { state } } = this.props;
    let Content;

    switch (state) {
      case STATE_WINNER: Content = this.renderWinner();
        break;
      case STATE_ANSWER: Content = this.renderAnswer();
        break;
      case STATE_GAME: Content = this.renderGame();
        break;
      case STATE_CHECK: Content = this.renderCheckTeam();
        break;
      default: Content = this.renderInit();
    }

    return (
      <div className={ `game-controls ${ className }` }>
        { Content }
      </div>
    );
  }

  renderQuestions() {
    const { stateData:{ round: { questions } } } = this.props;
    return (
      <ul>
        { questions.map((question, number) => {
          return (
            <li>
              <button type='button'
                      onClick={ () => this.onShowRow(question) }
                      { ...disabledAttr(question.isOpen) }>#{ number + 1 } открыть</button>
            </li>
          );
        }) }
      </ul>
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

  renderAnswer() {
    const { round: { questions } } = this.props.stateData;
    const hasAllOpen = questions.every(({ isOpen }) => isOpen);

    return (
      <div>
        { this.renderQuestions() }
        <button type='button'
                onClick={ () => this.onNextRound() }
                { ...disabledAttr(!hasAllOpen) }
        >Следующий раунд</button>
      </div>
    );
  }

  renderGame() {
    return (
      <div>
        { this.renderQuestions() }
        <button type='button'
                onClick={ () => this.onSetError() }>Ошибка</button>
        <button type='button'
                onClick={ () => this.onSetAnswer() }
                { ...disabledAttr(!hasEndRound(this.props.stateData)) }>Открываем ответы</button>
      </div>
    );
  }

  renderCheckTeam() {
    const { stateData: { teams:[ firstTeam, secondTeam ] } } = this.props;

    return (
      <div>
        <button type='button' onClick={ () => this.onSelectTeam(firstTeam) }>Команда: { firstTeam.name }</button>
        <button type='button' onClick={ () => this.onSelectTeam(secondTeam) }>Команда: { secondTeam.name }</button>
      </div>
    );
  }

  renderInit() {
    return (
      <div>
        <button type='button' onClick={ this.onStartGame }>Начать игру</button>
      </div>
    );
  }

}
