import React from 'react';
import './question-row.less';

const QuestionRow = ({ number, isOpen, name, score }) =>
  <div className={`c-question-row ${isOpen ? 'open' : ''}`}>
    <div className='front'>
      <span className='text'>{ number }</span>
    </div>
    <div className='back'>
      <span className='text'>{ name }</span>
      <span className='score'>{ score }</span>
    </div>
  </div>;

export default QuestionRow;
