import { routes } from './routes';

const express = require('express');
const app = express();

require("./database");

require('dotenv').config();

app.use(express.json());

app.use(routes);


app.listen(3080, () => { console.log("server is running") })