import * as React from 'react';
import { Store } from 'redux';
import * as ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import * as serialize from 'serialize-javascript';

interface HtmlProps {
  component: React.ReactElement<any>;
  store: Store<any>;
}

export default class Html extends React.Component<HtmlProps, {}> {
  public render() {
    /* eslint-disable react/no-danger */
    const { component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const helmet = Helmet.renderStatic();
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html lang="en-US">
        <head {...htmlAttrs}>
          {helmet.base.toComponent()}
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {helmet.script.toComponent()}
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="/pack/styles.css"
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
            char-set="UTF-8"
          />
        </head>
        <body {...bodyAttrs}>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
            charSet="UTF-8"
          />
          <script src="/pack/client.generated.js" charSet="UTF-8" />
        </body>
      </html>
    );
  }
  /* eslint-enable react/no-danger */
}
