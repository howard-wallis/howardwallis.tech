import fs from './fileSystem.json';

let currentPath = '';

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
	let lsPath = path || currentPath;
	return objAtPath(lsPath).children.map(c => c.name);
};

let cd = path => {
	return 'hi';
};

export {
	ls,
	cd,
	objAtPath
};