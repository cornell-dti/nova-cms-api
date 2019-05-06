import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import {ProjectDB} from './db'
import {Auth} from '../middleware/auth';

export default function routes() {
    const router = express.Router();

    router.get('/project',
    (req, res) => {
        res.status(HttpStatus.BAD_REQUEST).json({ error: "Missing project ID parameter." })
    });

    router.get('/project/:id',
    (req, res) => {
        let id : string = req.params.id;

        let projectDB = new ProjectDB();

        projectDB.getOne('id', id).then(project => {
            res.status(HttpStatus.OK).json(project);
        })
        .catch(error => {
            res.status(HttpStatus.BAD_REQUEST).json({ error });
        });
    });

    return router;
}