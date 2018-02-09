import defaultFs from './fileSystem.json';

let currentPath = ['/'];
let fs = defaultFs;

let setFs = fileSystemJson => {
    if (fileSystemJson)
        fs = fileSystemJson;
}

let objAtPath = path => {
	if (!path || typeof(path) !== 'string' || path === '/' || path === '\\') {
		return fs;
	}

	let components = path.split('/').filter(c => c !== '/' && c !== '');
	let res = fs;

	components.forEach(c => {
		res = res.children.filter(o => o.name === c)[0]
	});

	return res;
};

let pathOfObj = fsObj => {
	// recursive query until you find the obj
};

let ls = path => {
    path = path || currentPath;

    return objAtPath(path)
        .children
        .map(c => c.name)
        .join(' ')
        .trim();
};

let cd = path => {
    // TODO validation
    // TODO ensure /'s are included
    // TODO create path adjusting methods that deal with the path as an array underneath
	currentPath += path;
};

let getCurrentPath = () => {
    return currentPath;
}

export {
	ls,
	cd,
    objAtPath,
    setFs,
    getCurrentPath
};