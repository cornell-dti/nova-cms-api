// lib/app.ts
import express = require('express');
import * as HttpStatus from 'http-status-codes';

import globalRoutes from './global/routes';
import pageRoutes from './page/routes';
import teamMembersRoutes from './team-members/routes';
import teamMemberRoutes from './team-member/routes';

// Create a new express application instance
const app: express.Application = express();

app.use(globalRoutes());
app.use(pageRoutes());
app.use(teamMembersRoutes());
app.use(teamMemberRoutes());

app.use((req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({error: "Not found."});
});

app.listen(3000, function () {
  console.log('Nova CMS API started');
});