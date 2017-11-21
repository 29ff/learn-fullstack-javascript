// fetch the data from the api
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import axios from 'axios';
import config from './config';

const getApiUrl = contestId => {
  if (contestId) {
    return `${config.serverUrl}/api/contests/${contestId}`;
  }

  return `${config.serverUrl}/api/contests`;
};

const getInitialData = (contestId, apiData) => {
  if (contestId) {
    return {
      currentContestId: apiData._id,
      contests: {
        [apiData._id]: apiData
      }
    };
  }
  return {
    contests: apiData.contests
  };
};

const serverRender = (contestId) => {
  return new Promise((resolve, reject) => {
    axios.get(getApiUrl(contestId))
      .then(res => {
        const initialData = getInitialData(contestId, res.data);
        return resolve({
          initialMarkup: ReactDOMServer.renderToString(
            <App initialData={initialData}/>
          ),
          initialData
        });
      })
      .catch(err => reject(err));
  });
};

export default serverRender;
