"use strict";

const express = require("express");
const cors = require('cors');
const app = express();


const authRoutes = require('./auth/routes');
const v1Routes = require('./routes/v1');

const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const logger = require("./middleware/logger");

app.use(express.json());

app.use(logger);
app.use(authRoutes);

app.use('/api/v1',v1Routes);

app.use("*", notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};