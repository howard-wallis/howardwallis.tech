// https://www.npmjs.com/package/directory-structure-json
import defaultFs from './fileSystem.json';

let currentPath = [];
let fs = defaultFs;

let setFs = fileSystemJson => {
    if (fileSystemJson)
        fs = fileSystemJson;
};

let objAtPath = path => {
    if (!path || path.length === 0) {
        return fs;
    }

    let res = fs;

    for (let i = 0; i < path.length; i++) {
        res = res.children.filter(child => child.name === path[i])[0];
        if (res === undefined || res.length === 0) return null;
    }

    return res;
};

let getCurrentPath = () => currentPath;

let getCurrentPathString = () => {
    if (currentPath.length === 0)
        return '/';
    return currentPath.reduce((acc, cur) => acc + `${cur}/`, '/');
};

let setCurrentPath = path => {
    if (objAtPath(path)) {
        currentPath = path;
        return true;
    }
    return false;
};

let appendCurrentPath = path => {
    let newPath = currentPath.concat(path);
    if (objAtPath(newPath)) {
        currentPath = newPath;
        return true;
    }
    return false;
};

export {
    objAtPath,
    setFs,
    getCurrentPath,
    getCurrentPathString,
    setCurrentPath,
    appendCurrentPath
};