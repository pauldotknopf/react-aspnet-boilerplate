import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';

export interface ErrorListProps {
  errors?: string[];
}

class ErrorList extends React.Component<ErrorListProps> {
  public render() {
    const {
      errors
    } = this.props;
    if (!errors) return null;
    if (Array.isArray(errors)) {
      if (errors.length === 0) return null;
      return (
        <div className="alert alert-danger">
          {errors.map((err) =>
            (
              <p key={err}>
                <Glyphicon glyph="exclamation-sign" />
                {' '}
                {err}
              </p>
            ))
          }
        </div>
      );
    }
    return null;
  }
}

export default ErrorList;
