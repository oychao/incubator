import express from 'express';
import path from 'path';

import React from 'react';
import {
  renderToString
} from 'react-dom/server';

import App from './src/components/App';

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', (req, res) => {
  const jsx = <App />;
  const reactDom = renderToString(jsx);

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(htmlTemplate(reactDom));
});

app.listen(2048);

function htmlTemplate(reactDom) {
  return `${reactDom}`;
}