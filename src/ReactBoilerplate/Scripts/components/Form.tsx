import * as React from 'react';
import { modelStateErrorToFormFields } from '../utils/modelState';
import { Field } from './Input';
import ErrorList from './ErrorList';

interface FormProps {
  error: {
    errors: string[];
  };
  handleSubmit: (handler: (values: any, dispatch: (action: any) => any) => Promise<any>) => (evt: any) => void;
  fields: { [key: string]: Field | undefined; };
}

class Form<P = {}, S = {}> extends React.Component<P & FormProps, S> {
  // eslint-disable-next-line class-methods-use-this
  protected modifyValues(values: any) {
    return values;
  }
  protected handleApiSubmit(action: (values: any) => any, success?: (result: any) => void, error?: (result: any) => void) {
    const {
      handleSubmit
    } = this.props;
    return handleSubmit((values, dispatch) =>
      new Promise((resolve, reject) => {
        dispatch(action(this.modifyValues(values)))
          .then(
            (result: any) => {
              if (result.success) {
                resolve();
                if (success) {
                  success(result);
                }
              } else {
                reject(modelStateErrorToFormFields(result.errors));
                if (error) {
                  error(result);
                }
              }
            },
            (result: any) => {
              reject(modelStateErrorToFormFields(result.errors));
              if (error) {
                error(result);
              }
            }
          );
      }));
  }
  protected renderGlobalErrorList() {
    const {
      error
    } = this.props;
    if (!error) {
      return null;
    }
    if (!error.errors) {
      return null;
    }
    return (<ErrorList errors={error.errors} />);
  }
}

export default Form;
