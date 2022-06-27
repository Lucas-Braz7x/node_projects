import { handleError } from './shared/middlewares/handleError';
import 'reflect-metadata';
import express from 'express';
//import axios from 'axios';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import '@shared/typeOrm';
import routes from '@shared/http/routes/index';
import { upload } from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', express.static(upload.directory));
app.use(routes);

app.use(handleError);

app.use(errors());

const PORT = process.env.PORT || 3080;

app.listen(PORT, () => console.log(`Server is running in ${PORT}`));
