import request from 'superagent';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { RESPONSE } from './../server/utils/constant';

function getUrl(path) {
  if (path.startsWith('http') || canUseDOM) {
    return path;
  }

  return process.env.WEBSITE_HOSTNAME ?
    `http://${ process.env.WEBSITE_HOSTNAME }${ path }` :
    `http://127.0.0.1:${ global.server.get('port') }${ path }`;
}

function prepareResponse(resolve, reject) {
  const { STATUS, RESULT, SUCCESS } = RESPONSE;

  return (err, res) => {
    if (err) {
      reject(err);
    } else {
      let body = res.body;
      let response = body[ RESULT ];

      if (body[ STATUS ] == SUCCESS) {
        resolve(response);
      } else {
        reject(response);
      }
    }
  };
}

const HttpClient = {

  get: (path, payload) => new Promise((resolve, reject) => {
    request
      .get(getUrl(path))
      .query(payload || {})
      .accept('application/json')
      .end(prepareResponse(resolve, reject));
  }),
  put: (path, payload) => new Promise((resolve, reject) => {
    request
      .put(getUrl(path))
      .send(payload)
      .end(prepareResponse(resolve, reject));
  }),
  post: (path, payload) => new Promise((resolve, reject) => {
    request
      .post(getUrl(path))
      .send(payload)
      .end(prepareResponse(resolve, reject));
  }),
  delete: (path) => new Promise((resolve, reject) => {
    request
      .del(getUrl(path))
      .end(prepareResponse(resolve, reject));
  }),

};

export default HttpClient;
