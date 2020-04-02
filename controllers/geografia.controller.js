require("express");
const GEOGRAFIA = require("./data/geografia.json");

getGeografia = (req, res) => {
  var geografia = GEOGRAFIA;
  var params = req.query;
  var regiones = [];
  if (params.paisId && params.regionId) {
    let pais = geografia.paises.filter(x => x.paisId == params.paisId)[0];
    if (pais.regiones) {
      let region = pais.regiones.filter(x => x.regionId == params.regionId)[0];
      regiones = regiones.concat(region);
    }
  }
  let response = {
    code: 10,
    status: "OK",
    message: "Transacción procesada correctamente",
    data: regiones
  };

  console.log(response);
  res.status(200).json(response);
};


getFiltroCantones = (req, res) => {
  var geografia = GEOGRAFIA;
  var params = req.query;
  var data = [];

  if (
    params.paisId &&
    params.regionId &&
    params.provinciaId &&
    params.cantonId
  ) {
    let pais = geografia.paises.filter(x => x.paisId == params.paisId)[0];
    if (pais.regiones) {
      let region = pais.regiones.filter(x => x.regionId == params.regionId)[0];
      if (region.provincias) {
        let provincia = region.provincias.filter(
          x => x.provinciaId == params.provinciaId
        )[0];
        if (provincia.cantones.length) {
          let canton = provincia.cantones.filter(
            x => x.cantonId == params.cantonId
          )[0];
          data = data.concat(canton);
        }
      }
    }
  } else if (params.paisId && params.regionId && params.provinciaId) {
    let pais = geografia.paises.filter(x => x.paisId == params.paisId)[0];
    if (pais.regiones) {
      let region = pais.regiones.filter(x => x.regionId == params.regionId)[0];
      if (region.provincias) {
        let provincia = region.provincias.filter(
          x => x.provinciaId == params.provinciaId
        )[0];
        data = data.concat(provincia.cantones);
      }
    }
  } else if (params.paisId && params.regionId) {
    let pais = geografia.paises.filter(x => x.paisId == params.paisId)[0];
    if (pais.regiones) {
      let region = pais.regiones.filter(x => x.regionId == params.regionId)[0];
      if (region.provincias) {
        region.provincias.forEach(provincia => {
          if (provincia.cantones.length) {
            provincia.cantones.forEach(canton => {
              data = data.concat(canton);
            });
          }
        });
      }
    }
  } else if (params.paisId) {
    let pais = geografia.paises.filter(x => x.paisId == params.paisId)[0];

    pais.regiones.forEach(region => {
      if (region.provincias.length) {
        region.provincias.forEach(provincia => {
          if (provincia.cantones.length) {
            provincia.cantones.forEach(canton => {
              data = data.concat(canton);
            });
          }
        });
      }
    });
  }
  let response = {
    code: 10,
    status: "OK",
    message: "Transacción procesada correctamente",
    data: data
  };

  console.log(response);
  res.status(200).json(response);
};

module.exports = { getFiltroCantones, getGeografia }
