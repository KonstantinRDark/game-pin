/**
 * Если условие истина вернет объект с атрибутом disabled
 */
export default (condition) => {
  let attrs = {};

  if (condition) {
    attrs.disabled = 'disabled';
  }

  return attrs;
};
