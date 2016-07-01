import React, { PropTypes, Component } from 'react';

export default class ControlsWinner extends Component {
  static propTypes = {
    stateData: PropTypes.object,
    dispatch : PropTypes.func
  };

  render() {
    const { stateData } = this.props;

    return (
      <div>
        STATE: { stateData.state }
      </div>
    );
  }
}
