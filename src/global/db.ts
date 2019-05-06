import {Firestore} from '@google-cloud/firestore';
import {PageDocument} from '../models/page';
import { ElementDB } from '../db-new';

export class GlobalDB extends ElementDB<PageDocument> {
    getSettings() {
        return { collection: 'global' };
    }

    filterToT(d: FirebaseFirestore.DocumentData): PageDocument {
        return PageDocument.fromJSON(d);
    }
}