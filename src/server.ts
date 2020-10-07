import express from 'express';
import routes from './routes/users.routes';
import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);