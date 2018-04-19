import { parsePath, isFromRoot } from '../path';
import { setCurrentPath, appendCurrentPath } from '../fileSystem';

let cd = pathString => {
    // TODO ..
    let path = parsePath(pathString);
    if (!path) {
        return false;
    }

    if (isFromRoot(pathString)) {
        setCurrentPath(path);
    }
    else {
        appendCurrentPath(path);
    }
    return true;
};

export {
    cd
};