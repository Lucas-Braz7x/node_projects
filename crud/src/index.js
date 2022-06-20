const express = require('express');

const app = express();

const ip = require('ip').address();
const routes = require('./routes');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const protocol = process.env.PROTOCOL || 'http';
const port = process.env.PORT || 3080;

app.use(routes);

app.listen(port, () => console.log(
  `Rodando na porta ${port} or ${protocol}://${ip}:${port}`,
));
