/**
 * This module contains Nova website data read directly from JSON files.
 * It is only temporary and will be replaced by MongoDB.
 */

import * as fs from 'fs';

const dataPath = './data/';

const globalPath = dataPath + 'global.json';
const pagesPath = dataPath + 'pages'
const teamMembersPath = dataPath + 'members-sp19.json'

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

const Global : Object = JSON.parse(fs.readFileSync(globalPath, 'utf8'));

const Pages : Object = {
    apply: JSON.parse(fs.readFileSync(`${pagesPath}/apply.json`, 'utf8')),
    courses: JSON.parse(fs.readFileSync(`${pagesPath}/courses.json`, 'utf8')),
    home: JSON.parse(fs.readFileSync(`${pagesPath}/home.json`, 'utf8')),
    initiatives: JSON.parse(fs.readFileSync(`${pagesPath}/initiatives.json`, 'utf8')),
    sponsor: JSON.parse(fs.readFileSync(`${pagesPath}/sponsor.json`, 'utf8')),
    team: JSON.parse(fs.readFileSync(`${pagesPath}/team.json`, 'utf8'))
}

const TeamMembersList : Array<TeamMember> = JSON.parse(fs.readFileSync(teamMembersPath, 'utf8'));

export {Global, Pages, TeamMember, TeamMembersList}