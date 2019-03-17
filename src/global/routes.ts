import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import {Global} from '../db'

export default function routes() {
    const router = express.Router();

    router.get('/global',
    (req, res) => {
        res.status(HttpStatus.OK).json(Global);
    });

    return router;
}