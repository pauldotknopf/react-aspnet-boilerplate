import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/reducer';

class Index extends React.Component {
  public render() {
    return (
      <div />
    );
  }
}

export default connect(
  (state: RootState) => state,
  { }
)(Index);
