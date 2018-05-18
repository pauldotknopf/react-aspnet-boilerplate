import ApiClient from '../../helpers/ApiClient';

export default function clientMiddleware(client?: ApiClient) {
  return ({ dispatch, getState }: any) =>
    (next: any) => (action: any) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-use-before-define
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });

      const actionPromise = promise(client);
      actionPromise.then(
        (result: any) => next({ ...rest, result, type: SUCCESS }),
        (error: any) => next({ ...rest, error, type: FAILURE })
      ).catch((error: any) => {
        console.error('MIDDLEWARE ERROR:', error);
        console.error('MIDDLEWARE ERROR:', error.stack);
        next({ ...rest, error, type: FAILURE });
      });

      return actionPromise;
    };
}
