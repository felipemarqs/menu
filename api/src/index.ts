//Importações
//----------------------------------------------------------------
import http from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';
//Importação do Express
import express, { application } from 'express';
//Importação do Mongoose
import mongoose from 'mongoose';

import { router } from './router';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

//Initialize Database Connection
mongoose
  .connect('mongodb://127.0.0.1:27017')
  .then(() => {
    //Initialize Express
    const port = 3001;

    io.emit('orders@new');

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    app.use(express.json());
    app.use(router);

    server.listen(port, () => {
      console.log(`Server is listening on port http://localhost:${port}/`);
    });
  })
  .catch(() => console.log('Erro ao conectar ao mongo'));
