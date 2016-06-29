'use strict';
/**
 * Устанавливает свойство active
 *
 * @param {function} criteria
 * @returns {Function}
 */
export function active(criteria) {
  return list => {
    list.forEach(item => item.active = criteria(item));
    return list;
  };
}
