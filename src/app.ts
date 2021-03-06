// lib/app.ts
import express = require('express');
import * as HttpStatus from 'http-status-codes';

import globalRoutes from './global/routes';
import pageRoutes from './page/routes';
import teamMembersRoutes from './team-members/routes';
import teamMemberRoutes from './team-member/routes';
import projectRoutes from './project/routes';

// Create a new express application instance
const app: express.Application = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(globalRoutes());
app.use(pageRoutes());
app.use(teamMembersRoutes());
app.use(teamMemberRoutes());
app.use(projectRoutes());

app.use((req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({error: "Not found."});
});

if (process.env.PORT === undefined) process.env.PORT = "3000";

app.listen(process.env.PORT, function () {
  console.log('Nova CMS API started');
});
