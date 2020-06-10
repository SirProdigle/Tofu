const fs = require('fs');
const MAX_LEVELS = 8;

    FindPath = () => {
    let curDir = process.cwd() + "/";
    let foundDir = false;
    let levels = 0;

    while(!foundDir & levels < MAX_LEVELS) {
        const dirs = getDirectories(curDir);
        if(dirs.includes('Engine') && dirs.includes('Controllers') && dirs.includes('package.json')) {
            return curDir;
        }
        else curDir += "../"
        levels++;
    }
}

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .map(dirent => dirent.name)


module.exports = FindPath