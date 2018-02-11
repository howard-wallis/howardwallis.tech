// https://www.npmjs.com/package/directory-structure-json
import defaultFs from './fileSystem.json';
import {parsePath, isPath, isFilePath, isFromRoot} from './path.js';

let currentPath = ['/'];
let fs = defaultFs;

let setFs = fileSystemJson => {
    if (fileSystemJson)
        fs = fileSystemJson;
}

let objAtPath = path => {
	if (!path || path.length === 0) {
		return null;
	}
	if (path.length === 1 && path[0] === '/') {
		return fs;
    }
    
	let res = fs;

	path.forEach(pathPiece => {
        res = res.children.filter(child => child.name === pathPiece)[0];
        if (res === undefined) return null;
	});

	return res;
};

// let pathOfObj = fsObj => {
// 	// recursive query until you find the obj
// };

let ls = pathString => {
    let path = typeof(pathString) === 'string'
        ? parsePath(pathString) || currentPath
        : ['/'];

    return objAtPath(path)
        .children
        .map(c => c.name)
        .join(' ')
        .trim();
};

let cd = pathString => {
    let path = parsePath(pathString);
    if (!path) {
        return false;
    }

    if (isFromRoot(pathString)) {
        setCurrentPathByString(path);
    }
    else {
        appendCurrentPathByString(path);
    }
    return true;
};

let getCurrentPath = () => {
    return currentPath.join();
}

let setCurrentPath = path => {
    if(objAtPath(path)) {
        currentPath = isPath;
    }
}

let appendCurrentPath = path => {
    let newPath = currentPath.concat(path);
    if(objAtPath(newPath)) {
        currentPath = isPath;
    }
}

export {
	ls,
	cd,
    objAtPath,
    setFs,
    getCurrentPath
};