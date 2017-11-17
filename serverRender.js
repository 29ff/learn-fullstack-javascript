// fetch the data from the api
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import axios from 'axios';
import config from './config';


const serverRender = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${config.serverUrl}/api/contests`)
      .then(res => {
        return resolve({
          initialMarkup: ReactDOMServer.renderToString(
            <App initialData={res.data}/>
          ),
          initialData: res.data
        });
      })
      .catch(err => reject(err));
  });
};

export default serverRender;
