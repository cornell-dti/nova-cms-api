import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import {TeamMembersDB} from './db'
import { TeamMemberDocument } from '../models/team-member';
import asyncify from '../lib/asyncify';
import { Auth } from '../middleware/auth';

export default function routes() {
    const router = express.Router();

    /**
     * Returns all members. Does one of the following:
     * 1. If currentSubteam field exists, all members of that subteam are returned.
     * 2. If formerSubteam field exists, all members of that former subteam are returned.
     * 3. If role field exists, all members of that role are returned.
     * No compound queries are allowed currently.
     */
    router.get('/members',
    (req, res) => {
        let currentSubteam : string | undefined = req.query.current_subteam;
        let formerSubteam : string | undefined = req.query.former_subteam;
        let role : string | undefined = req.query.role;
        // Due to limitations of Firestore queries, previous functionality for compound queries is
        // not supported.
        // let conditional : string | undefined = req.query.conditional;

        let db = new TeamMembersDB();
        let resolve = (list : Array<TeamMemberDocument>) => { 
            res.status(HttpStatus.OK).json(list);
        };
        let reject = (error) => {
            res.status(HttpStatus.NOT_FOUND).json({ error });
        };

        if (currentSubteam) db.getAllWith('subteam', currentSubteam).then(resolve).catch(reject);
        else if (formerSubteam) db.getAllContains('otherSubteams', formerSubteam).then(resolve).catch(reject);
        else if (role) db.getAllWith('role', role).then(resolve).catch(reject);
        else db.getAll().then(resolve).catch(reject);
    });

    return router;
}