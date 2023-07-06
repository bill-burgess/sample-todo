import 'dotenv/config';
import express, { Router } from 'express';
import http from 'http';

import getItems from './routes/getItems';
import createItem from './routes/createItem';
import updateItem from './routes/updateItem';
import deleteItem from './routes/deleteItem';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const routes: Router = express.Router();
routes.get('/items', getItems);
routes.post('/items', createItem);
routes.patch('/items/:id', updateItem);
routes.delete('/items/:id', deleteItem);

app.use('/api', routes);

const server = http.createServer(app);
server.listen(port, () => {
  return console.log(`Express is listening on port: ${port}`);
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server has been gracefully closed.');
    process.exit(0);
  });
});