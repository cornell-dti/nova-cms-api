import {Firestore} from '@google-cloud/firestore';
import {ProjectDocument} from '../models/project';
import { ElementDB } from '../db-new';

export class ProjectDB extends ElementDB<ProjectDocument> {
    getSettings() {
        return { collection: 'projects' };
    }

    filterToT(d: FirebaseFirestore.DocumentData): ProjectDocument {
        return ProjectDocument.fromJSON(d);
    }
}