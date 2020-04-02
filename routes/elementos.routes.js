const Router = require("express").Router;
const { getElementoByid } = require("../controllers/elementos.controller");

class ElementosRoutes {
  constructor() {
    this.router = Router();
    this.config();
  }

  config() {
    this.router.post("/listaDetalleElementoByElemento", getElementoByid);
  }
}
module.exports = { ElementosRoutes };
