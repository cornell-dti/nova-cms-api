import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import {TeamMember, TeamMembersList} from '../db'

export default function routes() {
    const router = express.Router();

    router.get('/members',
    (req, res) => {
        let currentSubteam : string | undefined = req.query.current_subteam;
        let formerSubteam : string | undefined = req.query.former_subteam;
        let role : string | undefined = req.query.role;
        let conditional : string | undefined = req.query.conditional;

        const predicate = (member:TeamMember) => {
            if (conditional === 'and' || conditional === undefined) {
                return (currentSubteam === undefined || (member.subteam !== undefined && currentSubteam === member.subteam))
                    && (formerSubteam === undefined || (member.otherSubteams && member.otherSubteams.includes(formerSubteam)))
                    && (role === undefined || (member.roleId !== undefined && role === member.roleId));
            } else {
                return (currentSubteam === undefined && formerSubteam === undefined && role === undefined) 
                    || ((currentSubteam !== undefined && currentSubteam === member.subteam)
                        || (formerSubteam !== undefined && member.otherSubteams && member.otherSubteams.includes(formerSubteam))
                        || (role !== undefined && role === member.roleId));
            }
        };

        res.status(HttpStatus.OK).json(TeamMembersList.filter(predicate));
    });

    return router;
}