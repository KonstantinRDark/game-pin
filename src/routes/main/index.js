// Базовые классы
import React, { PropTypes } from 'react';
import BasePage from './../../components/page/base-page';

// Компоненты для отрисовки страницы
import Playground from './playground';
import Controls from './controls';

// Стили
import './main.less';

export default class extends BasePage {
  /**
   * Типы передаваемых свойств
   * @see https://facebook.github.io/react/docs/reusable-components.html
   */
  static propTypes = {
    
  };

  body() {
    return (
      <div className='main-page'>
        <Playground className='column-left'/>
        <Controls className='column-right'/>
      </div>
    );
  }
}
