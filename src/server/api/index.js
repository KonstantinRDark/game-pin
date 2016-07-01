'use strict';
const exec = (routes) => Object.keys(routes).map(name => routes[ name ]());

export default function api(server, prefix) {
  //server.use(`${prefix}/analytics`, exec(analyticsRoutes));
}
