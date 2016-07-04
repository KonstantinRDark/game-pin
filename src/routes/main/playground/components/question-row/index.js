// Базовые классы
import React from 'react';

// Стили
import './question-row.less';

const QuestionRow = ({ number, isOpen, name, score }) =>
  <div className={ `c-question-row ${ isOpen ? 'open' : '' }` }>
    <div className='front'>
      <div className='left'>
        <div className='line line-5'></div>
        <div className='line line-4'></div>
        <div className='line line-3'></div>
        <div className='line line-2'></div>
        <div className='line line-1'></div>
      </div>
      <span className='text'>{ number }</span>
      <div className='right'>
        <div className='line line-1'></div>
        <div className='line line-2'></div>
        <div className='line line-3'></div>
        <div className='line line-4'></div>
        <div className='line line-5'></div>
      </div>
    </div>
    <div className='back'>
      <span className='text'>{ name }</span>
      <span className='score'>{ score }</span>
    </div>
  </div>;

export default QuestionRow;
