'use strict';

export function dependency({ load }) {
  return (target, name, descriptor) => {
    let hasWin;
    try { hasWin = !!window } catch (e) { /* err */ }

    let { prototype } = target;
    let { render, componentWillMount } = prototype;

    if (!componentWillMount) { componentWillMount = () => {} }

    if (hasWin) {
      prototype.componentWillMount = function () {
        (new Promise(resolve => load(this, resolve)))
          .then((result) => {
            this.__loaded = true;
            this.setState(result);
            return componentWillMount();
          });
      };
    }

    prototype.render = function () {
      let hasWait = !hasWin || !this.__loaded;
      let body = hasWait ? 'wait loading....' : render.call(this);
      return (<div setClass={ hasWait ? 'loading' : '' }>{ body }</div>);
    };

    return descriptor;
  };
}
