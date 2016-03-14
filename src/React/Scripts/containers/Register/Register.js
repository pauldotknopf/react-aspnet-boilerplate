import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { register } from '../../redux/modules/register';
import Input from '../../components/Input';

const submit = (values, dispatch) => dispatch(register(values));

class Register extends Component {
  render() {
    const {
      fields: { userName, email, password, passwordConfirm },
      handleSubmit
    } = this.props;
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit(submit)} className="form-horizontal">
          <h4>Create a new account.</h4>
          <hr />
          <Input field={userName} label="User name" />
          <Input field={email} label="Email" />
          <Input field={password} label="Password" />
          <Input field={passwordConfirm} label="Confirm" />
          <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                  <button type="submit" className="btn btn-default">Register</button>
              </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.register;
}

function mapDispatchToProps() {
  return {
    register
  };
}

Register = reduxForm({
  form: 'register',
  fields: ['userName', 'email', 'password', 'passwordConfirm']
},
mapStateToProps,
mapDispatchToProps
)(Register);

export default Register;
