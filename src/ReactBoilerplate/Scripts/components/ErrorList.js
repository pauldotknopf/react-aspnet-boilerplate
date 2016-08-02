import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

class ErrorList extends Component {
  render() {
    const {
      errors
    } = this.props;
    if (!errors) return null;
    if (Array.isArray(errors)) {
      if (errors.length === 0) return null;
      return (
        <div className="alert alert-danger">
          {errors.map((err, i) =>
          (
            <p key={i}>
              <Glyphicon glyph="exclamation-sign" />
              {' '}
              {err}
            </p>
          ))}
        </div>
      );
    }
    return null;
  }
}

export default ErrorList;
