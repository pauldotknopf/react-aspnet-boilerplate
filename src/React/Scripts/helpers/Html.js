import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';

export default class Html extends Component {
  static propTypes = {
    component: PropTypes.node
  };

  render() {
    const { component } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    return (
      <html lang="en-us">
        <head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
        </body>
      </html>
    );
  }
}
