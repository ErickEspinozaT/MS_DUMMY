const Router = require("express").Router;
const { ElementosRoutes } = require("./elementos.routes");
const { GeografiaRoutes } = require("./geografia.routes");

class Routes {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.use("/elemento", new ElementosRoutes().router);
    this.router.use("/geografia", new GeografiaRoutes().router);
  }
}
module.exports = Routes;
