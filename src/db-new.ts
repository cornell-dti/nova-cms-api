import {Firestore, Query, DocumentData} from '@google-cloud/firestore';
import { JSONObject, JSONDoc } from "./lib/json";

const db = new Firestore({ keyFilename: './key.json' });

export abstract class ElementDB<T extends JSONObject> {

    abstract getSettings() : { collection: string };

    abstract filterToT(d: DocumentData) : T;

    getCollectionRef() {
        return db.collection(this.getSettings().collection);
    }

    getOne(key: string, val: string) : Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.getCollectionRef().where(key, '==', val).limit(1).get()
                .then(qSnap => {
                    if (qSnap.empty) return reject(`No element with ${key}=${val} found.`);
                    let data = qSnap.docs[0].data();
                    resolve(this.filterToT(data));
                })
                .catch(reject);
        });
    }

    getAll() : Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            this.getCollectionRef().get()
                .then(qSnap => {
                    if (qSnap.empty) return reject(`No elements found.`);
                    let data: Array<T> = [];
                    qSnap.forEach(docSnap => {
                        data.push(this.filterToT(docSnap.data()));
                    });
                    resolve(data);
                })
                .catch(reject);
        });
    }

    getAllWith(key: string, val: string) : Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            this.getCollectionRef().where(key, '==', val).get()
                .then(qSnap => {
                    if (qSnap.empty) return reject(`No elements with ${key}=${val} found.`);
                    let data: Array<T> = [];
                    qSnap.forEach(docSnap => {
                        data.push(this.filterToT(docSnap.data()));
                    });
                    resolve(data);
                })
                .catch(reject);
        });
    }

    getAllContains(arrayKey: string, val: string) : Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            this.getCollectionRef().where(arrayKey, 'array-contains', val).get()
                .then(qSnap => {
                    if (qSnap.empty) return reject(`No elements with ${arrayKey} containing ${val} found.`);
                    let data: Array<T> = [];
                    qSnap.forEach(docSnap => {
                        data.push(this.filterToT(docSnap.data()));
                    });
                    resolve(data);
                })
                .catch(reject);
        });
    }

    editOne(key: string, val: string, editTo) : Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.getCollectionRef().where(key, '==', val).limit(1).get()
                .then(qSnap => {
                    if (qSnap.empty) return reject(`No element with ${key}=${val} found.`);
                    let dataRef = qSnap.docs[0].ref;
                    dataRef.update(editTo).then(_ => {
                        this.getOne(key, val).then(resolve).catch(reject);
                    }).catch(reject);
                }).catch(reject);
        });
    }

    addOne(data: T) : Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.getCollectionRef().doc().set(data).then(_ => {
                resolve(data);
            }).catch(reject);
        });
    }

    removeOne(key: string, val: string) : Promise<String> {
        return new Promise<String>((resolve, reject) => {
            this.getCollectionRef().where(key, '==', val).limit(1).get()
                .then(qSnap => {
                    if (qSnap.empty) return reject(`No element with ${key} found.`);
                    this.getCollectionRef().doc(qSnap.docs[0].id).delete;
                    resolve("Success!");
                })
                .catch(reject);
        });
    }
}