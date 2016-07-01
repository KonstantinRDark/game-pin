import React, { Component } from 'react';
import { Link as ReactLink } from 'react-router';

export default class Link extends Component {
  render() {
    return <ReactLink { ...this.props }/>;
  }
}
