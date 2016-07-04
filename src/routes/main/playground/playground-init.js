// Базовые классы
import React, { Component } from 'react';

export default class PlaygroundInit extends Component {
  render() {
    const { stateData } = this.props;

    return (
      <div>
        STATE: { stateData.state }
      </div>
    );
  }
}
