import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Input extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired
  };
  render() {
    let hasError = false;
    if (this.props.field.touched) {
      if (typeof this.props.field.error === 'object') {
        if (typeof this.props.field.error.errors !== 'undefined') {
          if (Array.isArray(this.props.field.error.errors)) {
            if (this.props.field.error.errors.length > 0) {
              hasError = true;
            }
          }
        }
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
        </div>
      </div>
    );
  }
}
