import React, { Component } from 'react';
import { startGame, selectTeam, showRow, nextRound, toggleTeam, setError, answer } from './../command/action';
import { GAME_DATA, STATE_CHECK, STATE_GAME, STATE_ANSWER, STATE_WINNER } from './../command/constants';
import { connect } from 'react-redux';
import hasAnswerOnly from './../command/utils/has-answer-only';
const disabledAttr = (condition) => {
  let attrs = {};

  if (condition) {
    attrs.disabled = 'disabled';
  }

  return attrs;
};
const answerBtn = ({ stateData:state }, onClick) => {
  return (
    <button type='button'
            onClick={ onClick }
            { ...disabledAttr(!hasAnswerOnly(state)) }>Открываем ответы</button>
  );
};

const nextRoundBtn = ({ stateData:state }, onClick) => {
  const { round: { questions } } = state;
  const hasAllOpen = questions.every(({ isOpen }) => isOpen);

  if (hasAnswerOnly(state)) {
    return null;  
  }
  
  return (
    <button type='button'
            onClick={ onClick }
            { ...disabledAttr(!hasAllOpen) }>Следующий раунд</button>
  );
};

@connect(({ [ GAME_DATA ]:stateData }) => ({ stateData }))
export default class Controls extends Component {
  onStartGame = () => this.props.dispatch(startGame());
  onSelectTeam = (team) => this.props.dispatch(selectTeam(team));
  onShowRow = (row) => this.props.dispatch(showRow(row));
  onNextRound = () => this.props.dispatch(nextRound());
  onToggleTeam = () => this.props.dispatch(toggleTeam());
  onSetError = () => this.props.dispatch(setError());
  onSetAnwer = () => this.props.dispatch(answer());

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
    const { stateData:{ state, round: { questions } } } = this.props;
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
    return (
      <div>
        { this.renderQuestions() }
        { answerBtn(this.props, () => this.onSetAnwer()) }
        { nextRoundBtn(this.props, () => this.onNextRound()) }
      </div>
    );
  }

  renderGame() {
    // TODO Продумать каак определять что можно сменить команду или нельзя
    const { stateData:{ round: { errors } } } = this.props;
    const hasToggleTeam = errors.every(count => count === 3 || count === 0);

    return (
      <div>
        { this.renderQuestions() }
        <button type='button'
                onClick={ () => this.onSetError() }>Ошибка</button>
        <button type='button'
                onClick={ () => this.onToggleTeam() }
                { ...disabledAttr(hasToggleTeam) }>Переход хода</button>
        { nextRoundBtn(this.props, () => this.onNextRound()) }
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
