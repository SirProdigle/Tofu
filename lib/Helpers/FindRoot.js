const fs = require('fs');
const appRoot = require("app-root-path")
const Logger = require(`${appRoot}/lib/Logger`)
const MAX_LEVELS = 8;

FindPath = () => {
    let curDir = process.cwd() + "/";
    let foundDir = false;
    let levels = 0;

    while(!foundDir & levels < MAX_LEVELS) {
        const dirs = getDirectories(curDir);
        if(dirs.includes('Engine') && dirs.includes('Controllers') && dirs.includes('package.json')) {
            return curDir.slice(0,curDir.length-1);
        }
        else
            curDir += "../"
        levels++;
    }
    Logger.error("Could not find root of app. Check that command line is inside a Tofu project")
    process.exit(1)
}

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .map(dirent => dirent.name)


module.exports = FindPath()