import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { register } from '../../redux/modules/register';

const validate = values => {
  const errors = {};
  if (!values.userName) {
    errors.userName = 'Required';
  } else if (values.userName.length > 15) {
    errors.userName = 'Must be 15 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const submit = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ userName: ['User does not exist', 'another error'], _error: 'Login failed!' });
    }, 1000); // simulate server latency
  });

class Register extends Component {
  onSubmit(values) {
    console.log(values);
    this.props.onRegisterClick(values);
  }
  render() {
    const {
      fields: { userName, email, password, passwordConfirm },
      handleSubmit
    } = this.props;
    console.log(userName);
    return (
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label>User name</label>
          <input type="text" placeholder="User name" {...userName} />
          {userName.touched && userName.error && <div>{userName.error}</div>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Email" {...email} />
          {email.touched && email.error && <div>{email.error}</div>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Password" {...password} />
          {password.touched && password.error && <div>{password.error}</div>}
        </div>
        <div>
          <label>Confirm</label>
          <input type="password" placeholder="Confirm" {...passwordConfirm} />
          {passwordConfirm.touched && passwordConfirm.error && <div>{passwordConfirm.error}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
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
  fields: ['userName', 'email', 'password', 'passwordConfirm'],
  validate
},
mapStateToProps,
mapDispatchToProps
)(Register);

export default Register;
