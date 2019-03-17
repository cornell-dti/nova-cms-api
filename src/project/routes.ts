import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import {Projects} from '../db'

export default function routes() {
    const router = express.Router();

    router.get('/project',
    (req, res) => {
        res.status(HttpStatus.BAD_REQUEST).json({ error: "Missing project ID parameter." })
    });

    router.get('/project/:id',
    (req, res) => {
        let project = Projects[req.params.id];
        if (project !== undefined) res.status(HttpStatus.OK).json(project);
        else res.status(HttpStatus.BAD_REQUEST).json({error: "Project with the given ID not found."});
    });

    return router;
}