const routes = require('next-routes')();

routes
  .add('/Contracts/new', 'Contracts/new')
  .add('/Contracts/:address', '/Contracts/show')
  .add('/Contracts/:address/requests', 'Contracts/requests/index')
  .add('/Contracts/:address/requests/new', 'Contracts/requests/new');

module.exports = routes;