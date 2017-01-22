import * as React from 'react';
var Helmet = require('react-helmet');
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { loadPeople, IPerson, IPeopleState } from '../../redux/modules/people';

interface IPeopleProps {
  people : IPeopleState,
  loadPeople : () => Array<IPerson>
}

class People extends React.Component<IPeopleProps, any> {
  constructor(props) {
    super(props);
    this.loadButtonClick = this.loadButtonClick.bind(this);
  }

  public componentDidMount() {
    if (!this.props.people.people) {
      this.props.loadPeople();
    }
  }

  private loadButtonClick(event) {
    event.preventDefault();
    this.props.loadPeople();
  }

  public render() {
    const {
      people,
      loading,
      error
    } = this.props.people;
    let peopleComponent : Array<JSX.Element>;
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

export default connect((state) => ({ people: state.people }), { loadPeople })(People);
