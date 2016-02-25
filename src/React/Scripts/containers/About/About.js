import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {
  render() {
    return (
      <div className="container">
        <h1>About Us</h1>
        <Helmet title="About Us"/>
      </div>
    );
  }
}
