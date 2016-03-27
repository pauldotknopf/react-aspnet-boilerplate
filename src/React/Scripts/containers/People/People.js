import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { loadPeople } from 'redux/modules/people';

class People extends Component {
  constructor(props) {
    super(props);
    this.loadButtonClick = this.loadButtonClick.bind(this);
  }
  componentDidMount() {
    if (!this.props.people.people) {
      this.props.loadPeople();
    }
  }
  loadButtonClick(event) {
    event.preventDefault();
    this.props.loadPeople();
  }
  render() {
    const {
      people,
      loading,
      error
    } = this.props.people;
    let peopleComponent;
    if (people) {
      if (people.length > 0) {
        peopleComponent = people.map((person, i) =>
        (
          <div key={i}>
            <h2>{person.name}</h2>
            <p>{person.bio}</p>
          </div>
        ));
      }
    }
    return (
      <div>
        <Helmet title="People" />
        <p>
          <Button
            bsStyle="primary"
            disabled={loading}
            onClick={!loading ? this.loadButtonClick : null}>
            {loading ? 'Loading...' : 'Load'}
          </Button>
        </p>
        {error &&
          <Alert bsStyle="danger">
            {error}
          </Alert>
        }
        {peopleComponent}
      </div>
    );
  }
}

export default connect(
(state) => ({ people: state.people }),
{ loadPeople }
)(People);
