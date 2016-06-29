'use strict';

export const ResponseByCriteria = (list, callback) =>
  Promise.resolve(list.filter(el => callback(el)));

export const ResponseById  = (list, id) => {
  const find = list.find(el => el.id == id);

  if (!find) {
    let error = new Error();
    error.code = 404;
    error.message = 'resource.not.found';
    return Promise.reject(error);
  }

  return Promise.resolve(find);
};

export const ResponseList  = (list) => Promise.resolve(list);

export const ResponseCount  = (count) => Promise.resolve(count);

export const ResponsePaginate  = (list, page) =>
  Promise.resolve({
    data: list,
    page: page || 1,
    limit: 12,
    total: {
      count: 10000,
      pages: 100
    },
    filters: []
  });
