import * as superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

// eslint-disable-next-line no-underscore-dangle
declare const __SERVER__: any;

type RequestArgs = {
  params?: any;
  data?: any;
};

type ResponseArgs = {
  body?: any;
};

export default class ApiClient {
  [method: string]: (path: string, args?: RequestArgs) => Promise<any>;

  public constructor(req?: any) {
    methods.forEach((method) => {
      this[method] = (path: string, { params, data }: RequestArgs = {}) => new Promise((resolve, reject) => {
        const request = (superagent as any)[method](path);

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err: any, { body }: ResponseArgs = {}) => (err ? reject(body || err) : resolve(body)));
      });
    });
  }
}
