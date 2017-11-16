import path from 'path';
import config from './config';
import apiRouter from './api';
import express from 'express';
const server = express();

// use middleware for express server
server.use(express.static('public'));
server.use('/api', apiRouter);
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.get('/', (req, res) => {
  res.render('index');
});

server.listen(config.port, () => {
  console.info('Express listening on port ', config.port);
});
