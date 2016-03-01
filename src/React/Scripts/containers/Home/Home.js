import React, { Component } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Helmet title="Home"/>
        <h1>{config.app.title}</h1>
        <h2>{config.app.description}</h2>
        <div className="jumbotron">
          <p>
          From server: <strong>{this.props.Greeting}</strong>
          </p>
        </div>
        <div>
          This was rendered via an ASP.NET MVC Action method
          <pre>
          {"public IActionResult Index(string greeting = \"Hello!\")\n"}
          {"{\n"}
          {"    return View(\"js-/\", new GreetingViewModel\n"}
          {"    {\n"}
          {"        Greeting = greeting\n"}
          {"    });\n"}
          {"}\n"}
          </pre>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);