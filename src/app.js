const express = require("express");
const morgan = require("morgan");
const cors = require("cors")

const routes = require('./routes/index');


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use('/', routes);

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = app;
