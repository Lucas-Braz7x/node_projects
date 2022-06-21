const express = require('express');
const app = express();

require('dotenv').config()


app.listen(3080, () => { console.log("server is running") })