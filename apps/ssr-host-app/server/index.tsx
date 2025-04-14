import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom'

import fs from 'fs';
import path from 'path';
import App from '../src/App';
import React from 'react';

const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => {
  console.log(req.url);

  const renderString = renderToString(
    <StaticRouter location={req.url} >
      <App />
    </StaticRouter>
  );

  res.send(html.replace('__PLACEHOLDER__', renderString));
});



app.listen(3000, () => {
  console.log('SSR server running on http://localhost:3000');
});

