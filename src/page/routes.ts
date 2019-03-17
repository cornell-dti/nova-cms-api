import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import {Pages} from '../db'

export default function routes() {
    const router = express.Router();

    router.get('/page',
    (req, res) => {
        res.status(HttpStatus.BAD_REQUEST).json({ error: "Missing ID parameter." })
    });

    router.get('/page/:id',
    (req, res) => {
        let id : string = req.params.id;

        let page = Pages[id];

        if (page) {
            res.status(HttpStatus.OK).json(page);
        } else {
            res.status(HttpStatus.BAD_REQUEST).json({ error: 'Specified page ID does not exist.'});
        }
    });

    return router;
}