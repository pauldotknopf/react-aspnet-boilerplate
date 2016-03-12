import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { emailSignUp } from '../../actions/account';

class Register extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(emailSignUp({
      userName: 'Test',
      password: 'Test'
    }));
  }
  render() {
    const {
      fields: { userName, email, password, passwordConfirmation }
    } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>User name</label>
          <input type="text" placeholder="User name" {...userName} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Email" {...email} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Password" {...password} />
        </div>
        <div>
          <label>Confirm</label>
          <input type="password" placeholder="Confirm" {...passwordConfirmation} />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

Register = reduxForm({
  form: 'register',
  fields: ['userName', 'email', 'password', 'passwordConfirmation']
})(Register);

export default Register;
