import * as express from 'express';
import * as fs from 'fs';
import * as HttpStatus from 'http-status-codes';

export default function routes(dataPath: string) {
    const router = express.Router();

    router.get('/page',
    (req, res) => {
        res.status(HttpStatus.BAD_REQUEST).json({ error: "Missing ID parameter." })
    });

    router.get('/page/:id',
    (req, res) => {
        let id : string = req.params.id;
        let rawdata : string;
        try {
            rawdata = fs.readFileSync(`${dataPath}/pages/${id}.json`, 'utf8');
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({ error: "Page ID not found." });
        }
        let page = JSON.parse(rawdata);
        return res.status(200).json(page);
    });

    return router;
}