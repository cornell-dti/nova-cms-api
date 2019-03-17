import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import {TeamMembersList} from '../db'

export default function routes() {
    const router = express.Router();

    router.get('/member',
    (req, res) => {
        res.status(HttpStatus.BAD_REQUEST).json({ error: "Missing NetID parameter." })
    });

    router.get('/member/:netid',
    (req, res) => {
        let member = TeamMembersList.find((member => member.netid === req.params.netid));
        if (member !== undefined) res.status(HttpStatus.OK).json(member);
        else res.status(HttpStatus.BAD_REQUEST).json({error: "Member with the given NetID not found."});
    });

    return router;
}