import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from './redux/reducer';
import { User } from './redux/modules/account';
import {
  Home,
  About,
  Contact,
  NotFound,
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  ConfirmEmail,
  Manage,
  ManageIndex,
  ManageSecurity,
  ManageChangePassword,
  ManageLogins,
  ManageEmail
} from './containers';

class Routes extends React.Component<{ user?: User }> {
  private isUserLoggedIn() {
    return !!this.props.user;
  }

  public render() {
    return (
      <Switch>
        { /* Home (main) route */ }
        <Route exact path="/" component={Home} />

        { /* Routes */ }
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/confirmemail" component={ConfirmEmail} />

        <Route
          path="/manage"
          render={() => (
            !this.isUserLoggedIn() ? (
              <Redirect to="/login" />
            ) : (
              <Manage>
                <Switch>
                  <Route exact path="/manage" component={ManageIndex} />
                  <Route exact path="/manage/security" component={ManageSecurity} />
                  <Route exact path="/manage/email" component={ManageEmail} />
                  <Route exact path="/manage/changepassword" component={ManageChangePassword} />
                  <Route exact path="/manage/logins" component={ManageLogins} />
                </Switch>
              </Manage>
            )
          )}
        />

        { /* Catch all route */ }
        <Route component={NotFound} status={404} />
      </Switch>
    );
  }
}

export default connect(
  (state: RootState) => ({ user: state.auth.user, routing: state.routing }),
  {}
)(Routes);
