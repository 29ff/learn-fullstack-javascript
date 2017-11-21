import path from 'path';
import sassMiddleware from 'node-sass-middleware';
import bodyParser from 'body-parser';
import express from 'express';
import config from './config';
import apiRouter from './api';
const server = express();

server.use(bodyParser.json());

// use middleware for express server
server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));
server.use(express.static('public'));
server.use('/api', apiRouter);
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));


import serverRender from './serverRender';
server.get(['/', '/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
    .then(( {initialMarkup, initialData} ) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(err => console.error(err));
});

server.listen(config.port, config.host, () => {
  console.info('Express listening on port ', config.port);
});
