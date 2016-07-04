// Базовые классы
import React, { PropTypes, Component } from 'react';

// Компоненты для отрисовки страницы
import QuestionRow from './../question-row';

// Стили
import './questions.less';

export default class Questions extends Component {
  static propTypes = {
    className: PropTypes.string,
    questions: PropTypes.array
  };

  render() {
    const { className = '', questions } = this.props;

    return (
      <div className={ `c-questions ${ className }` }>
        { questions.map((question, i) => ((<QuestionRow key={ i } number={ ++i } { ...question }/>))) }
      </div>
    );
  }
};
