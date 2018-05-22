import * as React from 'react';
import Helmet from 'react-helmet';

export default class About extends React.Component {
  public render() {
    return (
      <div>
        <h1>About us...</h1>
        <Helmet title="About us" />
      </div>
    );
  }
}
