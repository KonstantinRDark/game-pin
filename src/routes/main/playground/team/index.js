import React, { PropTypes, Component } from 'react';
import Score from './../score';
import './team.less';

export default class Team extends Component {
  static propTypes = {
    round : PropTypes.number.isRequired,
    active: PropTypes.object,
    team  : PropTypes.object.isRequired,
    errors: PropTypes.number.isRequired
  };

  state = {
    round : this.props.round,
    active: this.props.active,
    team  : this.props.team,
    errors: this.props.errors
  };

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    const { className = '' } = this.props;
    const { round, team, active, errors } = this.state;
    const score = team.score;
    const arr = [
      errors >= 1,
      errors >= 2,
      errors >= 3
    ];

    return (
      <div className={ `c-team ${ className }` }>
        <div className={ `round${ !!active && active.id == team.id ? ' active' : '' }` }>
          <span className='text'>{ round }</span>
        </div>
        <div className='scores'>
          <Score score={ score }/>
        </div>
        <div className='errors'>
          <div>{ errors }</div>
          { arr.map((active, i) => ((<div key={ i } className={ `error${ active ? ' active' : '' }` }></div>))) }
        </div>
      </div>
    );
  }
};
