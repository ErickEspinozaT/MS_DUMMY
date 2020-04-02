const express = require("express");
const cors = require("cors");
const Routes = require("./routes");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const port = 3020;
const message = `Server listening on port ${port}`;

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", new Routes().router);
app.listen(port, () => console.log(message));
