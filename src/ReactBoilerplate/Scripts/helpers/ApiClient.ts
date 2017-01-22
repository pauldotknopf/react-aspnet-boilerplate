import * as superagent from 'superagent';

declare var __SERVER__ : any;

const methods = ['get', 'post', 'put', 'patch', 'del'];

class _ApiClient {
  constructor(req?) {
    methods.forEach((method) => {
      this[method] = (path, { params = null, data = null } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](path);

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body = null } = {}) => (err ? reject(body || err) : resolve(body)));
      });
    });
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
