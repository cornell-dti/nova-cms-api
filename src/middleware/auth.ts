import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

export class Auth {
    static ensureAuthenticated(req: express.Request, res: express.Response, next) {
        if (req.session && req.session.user) {
            next();
        } else {
            res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Must be logged in.' });
        }
    }
}