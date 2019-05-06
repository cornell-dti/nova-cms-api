import {Firestore} from '@google-cloud/firestore';
import {PageDocument} from '../models/page';
import { ElementDB } from '../db-new';

export class PageDB extends ElementDB<PageDocument> {
    getSettings() {
        return { collection: 'pages' };
    }

    filterToT(d: FirebaseFirestore.DocumentData): PageDocument {
        return PageDocument.fromJSON(d);
    }
}