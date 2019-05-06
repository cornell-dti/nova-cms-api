import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import {GlobalDB} from './db'
import { Auth } from '../middleware/auth';

export default function routes() {
    const router = express.Router();

    router.get('/global',
    (req, res) => {
        new GlobalDB().getOne('id', 'global').then(page => {
            res.status(HttpStatus.OK).json(page);
        })
        .catch(error => {
            res.status(HttpStatus.NOT_FOUND).json({ error });
        });
    });

    return router;
}