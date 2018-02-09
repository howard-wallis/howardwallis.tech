const fileSystem = require('../src/components/term/fileSystem.js');
const fsJson = require('./testFileSystem.json');

beforeAll(() => {
    fileSystem.setFs(fsJson);
});

test('objAtPath no path', () => {
	let res = fileSystem.objAtPath([]);
	expect(res).toBe(null);
});

test('objAtPath null path', () => {
	let res = fileSystem.objAtPath(null);
	expect(res).toBe(null);
});

test('objAtPath / path', () => {
	let res = fileSystem.objAtPath(['/']);
	expect(res).toBe(fsJson);
});

test('objAtPath /photos/img1.jpg', () => {
	let expected = {
		name: "img1.jpg",
		type: "file"
	};
	let res = fileSystem.objAtPath(['photos', 'img1.jpg']);
	expect(res).toEqual(expected);
});

test('objAtPath /photos/', () => {
	let expected = {
		"name": "photos",
		"type": "folder",
		"children": [
			{
				"name": "img1.jpg",
				"type": "file"
			},
			{
				"name": "img2.png",
				"type": "file"
			}
		]
	};
	let res = fileSystem.objAtPath(['photos']);
	expect(res).toEqual(expected);
});

test('ls no path', () => {
	let expected = 'photos file1.txt';
	let res = fileSystem.ls('');
	expect(res).toEqual(expected);
});

test('ls null path', () => {
	let expected = 'photos file1.txt';
	let res = fileSystem.ls(null);
	expect(res).toEqual(expected);
});

test('ls bad path', () => {
	let expected = 'photos file1.txt';
	let res = fileSystem.ls(12345);
	expect(res).toEqual(expected);
});

test('ls /photos path', () => {
	let expected = 'img1.jpg img2.png';
	let res = fileSystem.ls('/photos');
	expect(res).toEqual(expected);
});