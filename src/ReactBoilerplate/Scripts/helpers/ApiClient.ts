import superagent from 'superagent';

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
  public constructor(req?) {
    methods.forEach((method) => {
      this[method] = (path, { params, data }: RequestArgs = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](path);

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body }: ResponseArgs = {}) => (err ? reject(body || err) : resolve(body)));
      });
    });
  }
}
