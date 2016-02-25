import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import config from '../../config';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <Helmet {...config.app.head}/>
        {this.props.children}
      </div>
    );
  }
}
