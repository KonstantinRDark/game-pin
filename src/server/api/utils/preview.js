import { preview as previewMiddleware } from './../../../utils/string/preview';

export function preview(name) {
  return (response) => Object.assign(response, {
    data: response.data.map(item => Object.assign(item, {
      [ name ]: previewMiddleware(item[ name ])
    }))
  });
}
