// lib/app.ts
import express = require('express');

import pageRoutes from './page/routes';

// Create a new express application instance
const app: express.Application = express();

app.use(pageRoutes());

app.listen(3000, function () {
  console.log('Nova CMS API started');
});