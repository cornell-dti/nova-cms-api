import { JSONParsable, JSONObject, JSONArray, JSONPrimitiveArray, optional, JSONProperty } from '../lib/json';

@JSONParsable({ netid: 'string', name: 'string' })
export class TeamMemberDocument extends JSONObject {
    netid: string;
    name: string;
    @optional
    @JSONProperty('string')
    source?: string;
    @optional
    @JSONProperty('string')
    graduation?: string;
    @optional
    @JSONProperty('string')
    major?: string;
    @optional
    @JSONProperty('string')
    doubleMajor?: string;
    @optional
    @JSONProperty('string')
    minor?: string;
    @optional
    @JSONProperty('string')
    hometown?: string;
    @optional
    @JSONProperty('string')
    github?: string;
    @optional
    @JSONProperty('string')
    linkedin?: string;
    @optional
    @JSONProperty('string')
    other?: string;
    @optional
    @JSONProperty('string')
    website?: string;
    @optional
    @JSONProperty('string')
    about?: string;
    @optional
    @JSONProperty('string')
    subteam?: string;
    @optional
    @JSONPrimitiveArray('string')
    otherSubteams?: string[];
    @optional
    @JSONProperty('string')
    roleDescription?: string;
    @optional
    @JSONProperty('string')
    roleId?: string;
    @optional
    @JSONProperty('boolean')
    isLead?: boolean
}