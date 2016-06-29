'use strict';

const paragraph = (text, start = 0) => {
  const tag = !!~text.indexOf('p') ? 'p' : 'div';
  const indexOf = text.indexOf(tag, start);

  return text.slice(indexOf - 1, text.indexOf('>', text.indexOf(tag, indexOf + 1)) + 1);
};

const stripTags = (text) => text.replace(/<\S+.[!^>]*>/gi, '')
                                .replace(/<(\/|).[!^>]*>/gi, '');

export function preview(text, length = 500) {
  let preview = paragraph(text);
  let striped = stripTags(preview);

  if (striped.length > length) {
    let elements = [];
    let tags = [];
    let element = '';
    let opened = false;
    let openTag = '<';
    let closeTag = '>';
    let count = 0;

    const addToElement = (symbol) => {
      element += symbol;
      count++;
    };

    const addToTag = (symbol) => element += symbol;

    const addOpenTag = (symbol) => {
      opened = true;

      if (element.length > 0) {
        elements.push(element);
        element = '';
      }

      return element += symbol;
    };

    const addCloseTag = (symbol) => {
      element += symbol;
      elements.push(element);

      if (!~element.search(/<(?:img|br|hr)/)) {
        if (!~element.indexOf('/')) { // открывающий тег
          tags.push(`</${element.match(/<((?:\w|\d)+)(?:\s|\/|>)/)[1]}>`);
        } else { // закрывающий тег
          tags.pop();
        }
      }

      opened = false;
      return element = '';
    };

    let symbols = preview.split('');

    for (let i = 0, cnt = symbols.length; i != cnt; i++) {
      let symbol = symbols[i];

      // Сюда попадаем когда разрешенная длинна закончилась
      // Остается закрыть не закрытые теги и вернуть результат
      if (count > length) {
        if (element.length > 0) {
          elements.push(element);
          element = '';
        }

        preview = elements.concat(tags.reverse()).join('');
        break;
      }

      if (symbol === openTag || symbol === closeTag) {
        !opened ? addOpenTag(symbol) : addCloseTag(symbol);
        continue;
      }

      // Сюда попадаем когда внутри тега
      if (opened) {
        addToTag(symbol);
        continue;
      }

      // Сюда попадаем когда находимся между элементами
      addToElement(symbol);
    }
  }

  return preview;
}
