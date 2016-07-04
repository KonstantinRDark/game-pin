// Базовые классы
import React, { PropTypes, Component } from 'react';

// Инициаторы действий
import openQuestion from './../../command/actions/open-question';
import disabledAttr from './../utils/disabled-attr';

const QuestionRow = dispatch => (question, number) => {
  return (
    <li>
      <button type='button'
              onClick={ () => dispatch(openQuestion(question)) }
              { ...disabledAttr(question.isOpen) }>#{ number + 1 } открыть</button>
    </li>
  );
};

export default class Questions extends Component {
  static propTypes = {
    dispatch : PropTypes.func,
    questions: PropTypes.array
  };

  render() {
    const { questions, dispatch } = this.props;

    return (
      <ul>
        { questions.map(QuestionRow(dispatch)) }
      </ul>
    );
  }
};