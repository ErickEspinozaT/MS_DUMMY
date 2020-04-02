require("express");
let _ = require("lodash");
const ELEMENTOS = require("./data/elementos.json");

const getElementoByid = (req, res, next) => {
  const { elementoId } = req.body;
  console.log();
  try {
    const response = {
      code: 200,
      status: "OK",
      message: "Transacción realizada correctamente",
      data: _.find(ELEMENTOS, ["id", elementoId])
    };
    console.log(response);
    res.send(response);
  } catch (error) {
    console.error;
  }
};

module.exports = { getElementoByid };
