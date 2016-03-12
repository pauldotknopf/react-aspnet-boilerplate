import request from 'superagent';

export function register(body, success, failure) {
  request
    .post('/api/account/register')
    .end((err, res) => {
      if (err && failure) {
        failure(err);
      } else {
        if (success) {
          success(res);
        }
      }
    });
}
