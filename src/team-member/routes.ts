import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import {Auth} from '../middleware/auth';
import {TeamMemberDB} from './db';
import {EditRequestDB} from './db';
import { TeamMemberDocument } from '../models/team-member';

export default function routes() {
    const router = express.Router();

    router.get('/member',
    (req, res) => {
        res.status(HttpStatus.BAD_REQUEST).json({ error: "Missing NetID parameter." });
    });

    router.get('/member/:netid',
    (req, res) => {
        (new TeamMemberDB().getOne('netid', req.params.netid))
            .then(teammember => {
                res.status(HttpStatus.OK).json(teammember);
            })
            .catch(error => {
                res.status(HttpStatus.BAD_REQUEST).json({ error });
            });
    });

    return router;
}