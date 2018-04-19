import { parsePath, isFromRoot } from '../path';
import { setCurrentPath, getCurrentPathString } from '../fileSystem';

let cd = pathString => {
    if (!pathString) return null;

    let success = false;
    if (isFromRoot(pathString)) {
        let path = parsePath(pathString);
        if (!path) return helpText(pathString);
        success = setCurrentPath(path);
    }
    else {
        let path = parsePath(getCurrentPathString() + pathString);
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