import request from 'superagent';

console.log('testtt');


export default {
  register(body, success, failure) {
    request
      .post('/api/account/register')
      .send(body)
      .set('Accept', 'application/json')
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
};
