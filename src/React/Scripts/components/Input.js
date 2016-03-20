import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Glyphicon } from 'react-bootstrap';

export default class Input extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired
  };
  renderErrorList(errors) {
    if (!errors) {
      return null;
    }
    return (
      <div>
        {errors.map((err, i) =>
          (
            <p className="help-block"
              key={i}>
              <Glyphicon glyph="exclamation-sign" />
              {' '}
              {err}
            </p>
          )
        )}
      </div>
    );
  }
  render() {
    let hasError = false;
    let errors;
    if (this.props.field.touched && this.props.field.invalid) {
      hasError = true;
      errors = this.props.field.error.errors;
      if (!Array.isArray(errors)) {
        console.error('The errors object does not seem to be an array of errors.'); // eslint-disable-line max-len
        errors = null;
      }
      if (errors.length === 0) {
        console.error('The errors array is empty. If it is empty, no array should be provided, the field is valid.'); // eslint-disable-line max-len
      }
    }
    const rowClass = classNames({
      'form-group': true,
      'has-error': hasError,
    });
    return (
      <div className={rowClass}>
        <label className="col-md-2 control-label">{this.props.label}</label>
        <div className="col-md-10">
          <input type="text"
            className="form-control"
            placeholder={this.props.label}
            {...this.props.field}
          />
          {this.renderErrorList(errors)}
        </div>
      </div>
    );
  }
}
