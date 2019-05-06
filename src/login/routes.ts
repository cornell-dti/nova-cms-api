import * as express from 'express';
import {auth} from 'firebase';
import {TeamMemberDB} from './db';
import * as HttpStatus from 'http-status-codes';

export default function routes() {
    const router = express.Router();

    let easyLogon: boolean = process.env.easy_logon === 'true';

    router.post('/login',
    (req, res) => {
        if (easyLogon) {
            let netid: string = req.body.netid;
            (new TeamMemberDB().getOne('netid', netid))
                .then(teammember => {
                    if (req.session)
                        req.session.user = teammember;
                    res.json(teammember);
                })
                .catch(error => {
                    res.status(HttpStatus.UNAUTHORIZED).json({ error });
                });
        } else {
            let id_token = req.body.id_token;
            if (typeof id_token === 'undefined') res.status(HttpStatus.BAD_REQUEST).json({ error: 'Google authentication token not provided.' });
            else {
                let credential = auth.GoogleAuthProvider.credential(id_token);

                // Sign in with credential from the Google user.
                auth().signInAndRetrieveDataWithCredential(credential)
                .then(userCred => {
                if (userCred.user === null) {
                    res.status(HttpStatus.UNAUTHORIZED).json({ error: 'User information for the specified authentication token could not be found, but authentication was successful.' });
                } else {
                    let email = userCred.user.email;
                    if (email === null) {
                        res.status(HttpStatus.UNAUTHORIZED).json({ error: 'No email found for user.' });
                    } else {
                        let domain = email.split('@')[1];
                        if (domain !== 'cornell.edu') {
                                res.status(HttpStatus.UNAUTHORIZED).json({ error: 'User is not in the Cornell organization.' });
                        } else {
                                let netid = email.split('@')[0];
                                (new TeamMemberDB().getOne('netid', netid))
                                .then(teammember => {
                                    if (req.session)
                                        req.session.user = teammember;
                                    res.json(teammember);
                                })
                                .catch(error => {
                                    res.status(HttpStatus.UNAUTHORIZED).json({ error });
                                });
                        }
                    }
                }
                })
                .catch(err => {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
                });
            }
        }
    });

    return router;
}