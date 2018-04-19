import { parsePath, isFromRoot } from '../path';
import { setCurrentPath, appendCurrentPath, getCurrentPathString } from '../fileSystem';

let cd = pathString => {
    if (!pathString) return null;

    let success = false;
    if (isFromRoot(pathString)) {
        let path = parsePath(pathString);
        console.log('set', path);
        if (!path) return helpText(pathString);
        success = setCurrentPath(path);
    }
    else {
        let ps = getCurrentPathString() + pathString;
        let path = parsePath(getCurrentPathString() + pathString);
        console.log('append', ps, path);
        if (!path) return helpText(pathString);
        success = setCurrentPath(path);
    }
    if (!success) return helpText(pathString);
    return null;
};

let helpText = pathString => `-bash: cd: ${pathString}: No such directory`;

export {
    cd
};