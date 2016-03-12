import { register } from '../api/account';
export const EMAIL_SIGN_UP_START = 'EMAIL_SIGN_UP_START';
export const EMAIL_SIGN_UP_COMPLETE = 'EMAIL_SIGN_UP_COMPLETE';
export const EMAIL_SIGN_UP_ERROR = 'EMAIL_SIGN_UP_ERROR';

export function emailSignUpStart() {
  return { type: EMAIL_SIGN_UP_START };
}

export function emailSignUpComplete(user) {
  return { type: EMAIL_SIGN_UP_COMPLETE, user };
}
export function emailSignUpError(errors) {
  return { type: EMAIL_SIGN_UP_ERROR, errors };
}

export function emailSignUp(body) {
  return dispatch => {
    dispatch(emailSignUpStart());

    register(body,
      (success) => dispatch(emailSignUpComplete(success)),
      (errors) => dispatch(emailSignUpComplete(errors)));
  };
}
