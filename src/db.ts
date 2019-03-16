import * as fs from 'fs';

const dataPath = './data';

export default {
    apply: JSON.parse(fs.readFileSync(`${dataPath}/pages/apply.json`, 'utf8')),
    courses: JSON.parse(fs.readFileSync(`${dataPath}/pages/courses.json`, 'utf8')),
    home: JSON.parse(fs.readFileSync(`${dataPath}/pages/home.json`, 'utf8')),
    initiatives: JSON.parse(fs.readFileSync(`${dataPath}/pages/initiatives.json`, 'utf8')),
    sponsor: JSON.parse(fs.readFileSync(`${dataPath}/pages/sponsor.json`, 'utf8')),
    team: JSON.parse(fs.readFileSync(`${dataPath}/pages/team.json`, 'utf8'))
}