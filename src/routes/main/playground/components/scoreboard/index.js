// Базовые классы
import React, { PropTypes, Component } from 'react';

// Компоненты для отрисовки страницы
import Score from './../score';

// Стили
import './scoreboard.less';

export default class Scoreboard extends Component {
  static propTypes = {
    className: PropTypes.string,
    score    : PropTypes.number
  };

  state = {
    score: this.props.score
  };

  componentWillReceiveProps({ score }) {
    this.setState({ score });
  }

  render() {
    const { className = '' } = this.props;

    return (
      <div className={ `c-scoreboard ${ className }` }>
        <Score score={ this.state.score }/>
      </div>
    );
  }
};
