import React, { Component } from 'react';
import {
  Link as ReactLink,
  IndexLink as ReactIndexLink
} from 'react-router';

export default class Link extends Component {
  render() {
    return <ReactLink {...this.props}/>;
  }
}
