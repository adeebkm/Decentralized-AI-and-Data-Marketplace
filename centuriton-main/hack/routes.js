
const routes = require("next-routes")();

routes
  .add("/competitions/new", "/competitions/new")
  .add("/competitions/:address", "/competitions/show")
  .add("/competitions/:address/requests", "/competitions/requests/index")
  .add("/competitions/:address/requests/new", "/competitions/requests/new")
  .add("/competitions/requests/checkout/am", "/competitions/checkout/amodels")
  .add("/competitions/requests/checkout/dm", "/competitions/checkout/datasets");
  

module.exports = routes;
