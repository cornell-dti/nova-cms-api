import {Firestore} from '@google-cloud/firestore';
import {TeamMemberDocument} from '../models/team-member';
import { ElementDB } from '../db-new';

const db = new Firestore({ keyFilename: './key.json'});

export class TeamMemberDB extends ElementDB<TeamMemberDocument> {
    getSettings() {
        return { collection: 'team-members' };
    }

    filterToT(d: FirebaseFirestore.DocumentData): TeamMemberDocument {
        return TeamMemberDocument.fromJSON(d);
    }
}