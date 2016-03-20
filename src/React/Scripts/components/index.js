export LoginForm from './LoginForm/LoginForm';
export RegisterForm from './RegisterForm/RegisterForm';
export ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';
export Input from './Input';
// There is a bug in babel. When exporting types that will be inherited,
// you must import them directly from the component. You can't proxy
// them like this index.js does.
// http://stackoverflow.com/questions/28551582/traceur-runtime-super-expression-must-either-be-null-or-a-function-not-undefin
// export Form from './Form';
