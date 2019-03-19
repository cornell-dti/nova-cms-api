/**
 * This module contains Nova website data read directly from JSON files.
 * It is only temporary and will be replaced by MongoDB.
 */

import * as fs from 'fs';

const dataPath = './data/';

const globalPath = dataPath + 'global.json';
const pagesPath = dataPath + 'pages';
const teamMembersPath = dataPath + 'members-sp19.json';
const teamsPath = dataPath + 'teams.json';
const projectsPath = dataPath + 'projects';

interface TeamMember {
    name: string
    netid: string
    source?: string
    graduation?: string
    major?: string
    doubleMajor?: string
    minor?: string
    hometown?: string
    github?: string
    linkedin?: string
    other?: string
    website?: string
    about?: string
    subteam?: string
    otherSubteams?: string
    roleDescription?: string
    roleId?: string
}

const createObjectMap = (path:String, fileNames:Array<String>, key?:string) =>
    fileNames.map((fileName => {
        let json = JSON.parse(fs.readFileSync(`${path}/${fileName}.json`, 'utf-8'));
        //If key undefined, we store object under its file's name
        if (key === undefined) return { id: fileName, json };
        else return { id: json[key], json };
    })).reduce((acc, value) => { acc[value.id] = value.json; return acc; }, {});

const Global : Object = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
const Pages = createObjectMap(pagesPath, ['apply', 'courses', 'home', 'initiatives', 'sponsor', 'team', 'projects']);
const TeamMembersList : Array<TeamMember> = JSON.parse(fs.readFileSync(teamMembersPath, 'utf8'));
const Projects = createObjectMap(projectsPath, ['events', 'orientation', 'queuemein', 'researchconnect', 'reviews', 'samwise', 'shout', 'website'], 'id');

export {Global, Pages, TeamMember, TeamMembersList, Projects}