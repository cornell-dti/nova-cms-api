// lib/app.ts
import express = require('express');

import pageRoutes from './page/routes';

const dataPath = './data';

// Create a new express application instance
const app: express.Application = express();

app.use(pageRoutes(dataPath));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});