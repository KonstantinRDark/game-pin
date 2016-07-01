import React, { PropTypes, Component } from 'react';
import { selectTeam } from './../command/action';

export default class ControlsSelectTeam extends Component {
  static propTypes = {
    stateData: PropTypes.object,
    dispatch : PropTypes.func
  };

  nextState = (team) => this.props.dispatch(selectTeam(team));

  render() {
    const { stateData: { teams:[ firstTeam, secondTeam ] } } = this.props;

    return (
      <div>
        <button type='button' onClick={ () => this.nextState(firstTeam) }>Команда: { firstTeam.name }</button>
        <button type='button' onClick={ () => this.nextState(secondTeam) }>Команда: { secondTeam.name }</button>
      </div>
    );
  }
}
