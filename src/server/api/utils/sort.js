const compare = (a, b) => {
  if (a < b) { return -1 }

  if (a > b) { return 1 }

  // a должно быть равным b
  return 0;
};

export function sort(getValue) {
  return (list) =>
    list.sort((a, b) => {
      if (typeof getValue === 'string') {
        return compare(a[ getValue ], b[ getValue ]);
      }
      
      return compare(getValue(a), getValue(b));
    });
}
