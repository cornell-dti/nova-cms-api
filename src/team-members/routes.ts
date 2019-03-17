import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import {TeamMembers} from '../db'

export default function routes() {
    const router = express.Router();

    router.get('/members',
    (req, res) => {
        let currentSubteam : string | undefined = req.query.current_subteam;
        let formerSubteam : string | undefined = req.query.former_subteam;
        let role : string | undefined = req.query.role;
        let conditional : string | undefined = req.query.conditional;

        const predicate = member => {
            if (conditional === 'and' || conditional === undefined) {
                return (currentSubteam === undefined || currentSubteam === member.subteam)
                    && (formerSubteam === undefined || (member.otherSubteams && member.otherSubteams.includes(formerSubteam)))
                    && (role === undefined || role === member.roleId);
            } else {
                return (currentSubteam === member.subteam)
                || (member.otherSubteams && member.otherSubteams.includes(formerSubteam))
                || role === member.roleId;
            }
        };

        res.status(HttpStatus.OK).json(TeamMembers.filter(predicate));
    });

    return router;
}