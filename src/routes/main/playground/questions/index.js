import React, { PropTypes, Component } from 'react';
import './questions.less';
import QuestionRow from './../question-row';

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
