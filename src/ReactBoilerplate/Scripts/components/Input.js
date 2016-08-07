import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Glyphicon } from 'react-bootstrap';

class Input extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    type: React.PropTypes.oneOf([
      'password',
      'text',
      'option',
      'checkbox'
    ]),
  };
  buildFieldProps() {
    const {
      defaultChecked,
      defaultValue,
      name,
      onBlur,
      onChange,
      onDragStart,
      onDrop,
      onFocus
    } = this.props.field;
    return {
      defaultChecked,
      defaultValue,
      name,
      onBlur,
      onChange,
      onDragStart,
      onDrop,
      onFocus
    };
  }
  renderErrorList(errors) {
    if (!errors) {
      return null;
    }
    return (
      <div>
        {errors.map((err, i) =>
        (
          <p
            className="help-block"
            key={i}>
            <Glyphicon glyph="exclamation-sign" />
            {' '}
            {err}
          </p>
        ))}
      </div>
    );
  }
  renderInput() {
    return (
      <input
        type={this.props.type}
        id={this.props.field.name}
        className="form-control"
        placeholder={this.props.label}
        {...this.buildFieldProps()}
      />
    );
  }
  renderOption() {
    const {
      options
    } = this.props;
    return (
      <select
        type={this.props.type}
        id={this.props.field.name}
        className="form-control"
        placeholder={this.props.label}
        {...this.buildFieldProps()}>
        {options.map((option, i) =>
        (
          <option key={i} value={option.value}>{option.display}</option>
        ))}
      </select>
    );
  }
  renderCheckBox() {
    return (
      <div className="checkbox">
        <input id={this.props.field.name} type="checkbox" {...this.buildFieldProps()} />
        <label htmlFor={this.props.field.name}>{this.props.label}</label>
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
    let input;
    switch (this.props.type) {
      case 'password':
      case 'text':
        input = this.renderInput();
        break;
      case 'option':
        input = this.renderOption();
        break;
      case 'checkbox':
        input = this.renderCheckBox();
        break;
      default:
        throw new Error('unknown type');
    }
    return (
      <div className={rowClass}>
        {(this.props.type !== 'checkbox') &&
          <label className="col-md-2 control-label" htmlFor={this.props.field.name}>{this.props.label}</label>
        }
        <div className={(this.props.type === 'checkbox' ? 'col-md-offset-2 ' : '') + 'col-md-10'}>
          {input}
          {this.renderErrorList(errors)}
        </div>
      </div>
    );
  }
}

Input.defaultProps = {
  type: 'text'
};

export default Input;
