import React, { PropTypes, Component } from 'react';
import './score.less';

export default class Score extends Component {
  static propTypes = {
    score: PropTypes.number
  };

  timeout = 75;

  state = {
    score: this.props.score
  };

  incrementScore = (nextProps) => {
    let { score } = this.state;

    if (!nextProps.score && !score) {
      return;
    }

    if (nextProps.score != 0 && score >= nextProps.score) {
      score = nextProps.score;
    } else {

      if (nextProps.score === 0) {
        score--;
      } else {
        score++;
      }

      setTimeout(() => this.incrementScore(nextProps), this.timeout);
    }

    this.setState({ score });
  };

  componentWillReceiveProps(nextProps) {
    this.incrementScore(nextProps);
  }

  render() {
    const { className = '' } = this.props;

    return (
      <div className={`c-score ${className}`}>
        <div className='text'>{ this.state.score }</div>
        <div className='cover'></div>
      </div>
    );
  }
};
