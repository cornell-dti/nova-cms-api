/**
 * This module contains Nova website data read directly from JSON files.
 * It is only temporary and will be replaced by MongoDB.
 */

import * as fs from 'fs';

const dataPath = './data/';
const pagesPath = dataPath + 'pages'
const teamMembersPath = dataPath + 'members-sp19.json'

const TeamMembers : Array<Object> = JSON.parse(fs.readFileSync(teamMembersPath, 'utf8'));

const Pages : Object = {
    apply: JSON.parse(fs.readFileSync(`${pagesPath}/apply.json`, 'utf8')),
    courses: JSON.parse(fs.readFileSync(`${pagesPath}/courses.json`, 'utf8')),
    home: JSON.parse(fs.readFileSync(`${pagesPath}/home.json`, 'utf8')),
    initiatives: JSON.parse(fs.readFileSync(`${pagesPath}/initiatives.json`, 'utf8')),
    sponsor: JSON.parse(fs.readFileSync(`${pagesPath}/sponsor.json`, 'utf8')),
    team: JSON.parse(fs.readFileSync(`${pagesPath}/team.json`, 'utf8'))
}

export {Pages, TeamMembers}