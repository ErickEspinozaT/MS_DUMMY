require("express");
const { client } = require("../config/client.postgres");

const _selectUser =
  "select id_document, first_name, last_name, mail, telephone from clients where";
const _selectAllUsers = `${_selectUser} mail is not null and telephone is not null ORDER BY random() limit 10;`;
const _deleteUser = "delete from clients where";

const testing = (req, res, next) => {
  res.send("Success");
  console.log("testing");
};

const getUsuarios = async (req, res, next) => {
  try {
    await client.connect();
    const queryResult = await client.query(_selectAllUsers);
    await client.end();
    const data = queryResult.rows;
    res.send(data);
  } catch (error) {
    console.error;
  }
};
const getUsuariobyId = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    await client.connect();
    const queryResult = await client.query(
      `${_selectUser} id_document = '${id}'`
    );
    const data = queryResult.rows;
    res.send(data);
  } catch (error) {
    console.error;
  }
  await client.end();
};
const deleteUsuario = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  console.log(_deleteUser);
  try {
    await client.connect();
    const queryResult = await client.query(
      `${_deleteUser} id_document = '${id}'`
    );
    console.log(queryResult);
    res.send(`Usuario ${id} eliminado.`);
  } catch (error) {
    console.error;
  }
  await client.end();
};
const insertUsuario = async (req, res, next) => {
  const usuario = req.body;

  const _insertUser = `call insertUser('${usuario.cedula}', '${usuario.nombre}', '${usuario.apellido}');`;
  console.log(_insertUser);
  try {
    await client.connect();
    await client.query(_insertUser);
    res.send(`Usuario ${usuario.cedula} ingresado. ${queryResult}`);
  } catch (error) {
    console.error;
  }
  await client.end();
};

module.exports = {
  testing,
  getUsuarios,
  getUsuariobyId,
  deleteUsuario,
  insertUsuario
};
