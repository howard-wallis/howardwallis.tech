const path = require('../src/components/term/path.js');

describe('parsePath', () => {

	test('no path', () => {
		let res = path.parsePath('');
		expect(res).toBe(null);
	});
	
	test('null path', () => {
		let res = path.parsePath(null);
		expect(res).toBe(null);
	});
	
	test('/ path', () => {
		let res = path.parsePath('/');
		expect(res).toEqual([]);
	});

	test('/photos/path path', () => {
		let res = path.parsePath('/photos/path');
		expect(res).toEqual(['photos', 'path']);
	});

});

describe('isPath identifies correct paths', () => {
	let correctPaths = ['/', 'path', '/path/path2', 'path/path-path'];
	correctPaths.forEach(p => 
		test(p, () => {
			expect(path.isPath(p)).toBeTruthy();
		})
	);
});

describe('isPath identifies incorrect paths', () => {
	let incorrectPaths = ['', null, 'path/^path'];
	incorrectPaths.forEach(p => 
		test(p, () => {
			expect(path.isPath(p)).toBeFalsy();
		})
	);
});

describe('isFilePath identifies correct paths', () => {
	let correctPaths = ['/file.file', 'path.js', '/path/path2.test.js'];
	correctPaths.forEach(p => 
		test(p, () => {
			expect(path.isFilePath(p)).toBeTruthy();
		})
	);
});

describe('isFilePath identifies incorrect paths', () => {
	let incorrectPaths = ['', null, 'path/^path', 'path/path-path', '/path'];
	incorrectPaths.forEach(p => 
		test(p, () => {
			expect(path.isFilePath(p)).toBeFalsy();
		})
	);
});

test('isFromRoot /from/root', () => {
	expect(path.isFromRoot('/from/root')).toBe(true);
});

test('isFromRoot not/from/root', () => {
	expect(path.isFromRoot('not/from/root')).toBe(false);
});