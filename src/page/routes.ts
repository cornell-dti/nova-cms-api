import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import {PageDB} from './db'
import { Auth } from '../middleware/auth';

export default function routes() {
    const router = express.Router();

    router.get('/page',
    (req, res) => {
        res.status(HttpStatus.BAD_REQUEST).json({ error: "Missing ID parameter." });
    });

    router.get('/page/:id',
    (req, res) => {
        let id : string = req.params.id;

        let pageDB = new PageDB();

        pageDB.getOne('id', id).then(page => {
            res.status(HttpStatus.OK).json(page);
        })
        .catch(error => {
            res.status(HttpStatus.BAD_REQUEST).json({ error });
        });
    });

    return router;
}