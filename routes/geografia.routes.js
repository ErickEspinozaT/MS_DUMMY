const Router = require("express").Router;
const { getFiltroCantones, getGeografia } = require("../controllers/geografia.controller");

class GeografiaRoutes {
  constructor() {
    this.router = Router();
    this.config();
  }

  config() {
    this.router.get("/getCantonesByFiltro?", getFiltroCantones);
    this.router.get("/getGeografia?", getGeografia);
  }
}
module.exports = { GeografiaRoutes };
