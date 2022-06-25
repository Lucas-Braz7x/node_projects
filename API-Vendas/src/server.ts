import 'reflect-metadata';
import express from 'express';
//import axios from 'axios';
import 'express-async-errors';
import cors from 'cors';
import '@shared/typeOrm';
import routes from '@shared/http/routes/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3080;

app.listen(PORT, () => console.log(`Server is running in ${PORT}`));
