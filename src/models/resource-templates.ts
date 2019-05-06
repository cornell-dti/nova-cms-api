import { JSONParsable, JSONObject, JSONEnum, JSONArray, JSONProperty } from '../lib/json';

export enum ResourceType {
    TEXT,
    LINK,
    IMAGE,
    CONTAINER
}

export type LinkDescription = { text: string, link: string };
export type ImageDescription = { cap: string, imgLink: string };

export function is_link_description(x): x is LinkDescription {
    return true;
}

export function is_img_description(x): x is ImageDescription {
    return true;
}