export function types(...types) {
  return (target, name, descriptor) => {
    descriptor.__action_types = types;
    return descriptor;
  };
}

export function payload(callback) {
  return (target, name, descriptor) => {
    descriptor.__action_payload = callback;
    return descriptor;
  };
}

const slugToId = (slug) => {

  if (typeof slug === 'string' && !!~slug.search(/\d+-.+/)) {
    slug = slug.split('-')[ 0 ];
  }

  return slug;
};

export function action(target, name, descriptor) {
  descriptor.__action_callApi = descriptor.value;
  // we then overwrite the origin descriptor value
  // and return the new descriptor
  descriptor.value = function asyncWrapper(...params) {
    let { __action_types, __action_payload, __action_callApi } = descriptor;
    let ids = params.map(slugToId);

    if (!__action_payload) {
      __action_payload = () => ({});
    }

    if (!__action_types) {
      throw new Error(`Не объявлены типы дествия (@types):
          @action
          @types(
            TYPE_REQUEST,
            TYPE_SUCCESS,
            TYPE_FAILURE
          )`
      );
    }

    return {
      types  : __action_types,
      callAPI: () => __action_callApi(...ids),
      payload: __action_payload(...ids)
    };
  };

  return descriptor;
}

