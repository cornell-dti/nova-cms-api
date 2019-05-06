// lib/app.ts
import express = require('express');
import bodyParser from 'body-parser';
import session from 'express-session';
import * as HttpStatus from 'http-status-codes';
import * as firebase from 'firebase';

import globalRoutes from './global/routes';
import loginRoutes from './login/routes';
import pageRoutes from './page/routes';
import teamMembersRoutes from './team-members/routes';
import teamMemberRoutes from './team-member/routes';
import projectRoutes from './project/routes';

import env from './env';

env();
if (firebase.apps.length === 0)
  firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: `${process.env.project_id}.firebaseapp.com`,
    databaseURL: `https://${process.env.project_id}.firebaseio.com`,
    projectId: process.env.project_id,
  });
else firebase.app();

// Create a new express application instance
const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.secret ? process.env.secret : 'keyboard cat 12345',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to TRUE for production
}))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(globalRoutes());
app.use(loginRoutes());
app.use(pageRoutes());
app.use(teamMembersRoutes());
app.use(teamMemberRoutes());
app.use(projectRoutes());

app.use((req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({error: "Not found."});
});

if (process.env.PORT === undefined) process.env.PORT = "3000";

app.listen(process.env.PORT, function () {
  console.log('DTI Admin Panel CMS API started');
});
