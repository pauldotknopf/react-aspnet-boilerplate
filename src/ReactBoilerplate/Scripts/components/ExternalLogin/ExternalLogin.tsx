import * as React from 'react';
import { connect } from 'react-redux';
import { authenticate, ExternalLoginProvider } from '../../redux/modules/externalLogin';
import { ExternalLoginButton } from '../../components';
import { RootState } from '../../redux/reducer';

export interface ExternalLoginProps {
  authenticate: (scheme: string) => any;
  loginProviders: ExternalLoginProvider[];
  leadingText?: string;
}

class ExternalLogin extends React.Component<ExternalLoginProps> {
  public constructor(props: ExternalLoginProps) {
    super(props);
    this.loginClick = this.loginClick.bind(this);
  }
  public loginClick(scheme: string) {
    return (event: any) => {
      event.preventDefault();
      this.props.authenticate(scheme);
    };
  }
  public render() {
    const {
      loginProviders
    } = this.props;
    return (
      <p>
        {loginProviders.map((loginProvider) =>
          (
            <span key={loginProvider.scheme}>
              <ExternalLoginButton
                onClick={this.loginClick(loginProvider.scheme)}
                scheme={loginProvider.scheme}
                text={(this.props.leadingText ? (this.props.leadingText + ' ') : '') + loginProvider.displayName} />
              {' '}
            </span>
          ))
        }
      </p>
    );
  }
}

export default connect(
  (state: RootState) => ({ loginProviders: state.externalLogin.loginProviders }),
  { authenticate }
)(ExternalLogin);
