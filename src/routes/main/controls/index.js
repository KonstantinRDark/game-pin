import React, { Component } from 'react';
import {
  startGame,
  selectTeam,
  showRow
} from './../command/action';
import {
  GAME_DATA,
  STATE_CHECK,
  STATE_GAME,
  STATE_ANSWER,
  STATE_WINNER,
} from './../command/constants';

import { connect } from 'react-redux';

@connect(({ [GAME_DATA]:stateData }) => ({ stateData }))
export default class Controls extends Component {
  startGame = () => this.props.dispatch(startGame());
  selectTeam = (team) => this.props.dispatch(selectTeam(team));
  showRow = (row) => this.props.dispatch(showRow(row));

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
      <div className={`game-controls ${className}`}>
        { Content }
      </div>
    );
  }

  renderQuestions() {
    const { stateData:{ state, round: { questions } } } = this.props;
    return (
      <ul>
        {questions.map(question => {
          let attrs = {};

          if (question.isOpen) {
            attrs.disabled = 'disabled';
          }

          return (
            <li>
              <span>{question.name}</span>
              <span> [ {question.score} ] </span>
              <button type='button' onClick={() => this.showRow(question)} {...attrs}>Открыть ответ</button>
            </li>
          );
        })}
      </ul>
    );
  }

  renderWinner() {
    const { stateData } = this.props;

    return (
      <div>
        STATE: {stateData.state}
      </div>
    );
  }

  renderAnswer() {
    const { stateData:{ round: { questions } } } = this.props;
    const hasAllOpen = questions.every(question => question.isOpen);
    const hasNextRound = !hasNextTeam;

    return (
      <div>
        { this.renderQuestions() }
      </div>
    );
  }

  renderGame() {
    const { stateData:{ round: { errors, questions } } } = this.props;
    const hasAllOpen = questions.every(question => question.isOpen);
    const hasAnswer = hasAllOpen || (errors[0] == 3 && errors[1] === 3);

    // TODO Продумать каак определять что можно сменить команду или нельзя

    return (
      <div>
        { this.renderQuestions() }
      </div>
    );
  }

  renderCheckTeam() {
    const { stateData: { teams:[firstTeam, secondTeam] } } = this.props;

    return (
      <div>
        <button type='button' onClick={() => this.selectTeam(firstTeam)}>Команда: {firstTeam.name}</button>
        <button type='button' onClick={() => this.selectTeam(secondTeam)}>Команда: {secondTeam.name}</button>
      </div>
    );
  }

  renderInit() {
    return (
      <div>
        <button type='button' onClick={this.startGame}>Начать игру</button>
      </div>
    );
  }

}
