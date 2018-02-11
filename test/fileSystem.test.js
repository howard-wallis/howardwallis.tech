const fileSystem = require('../src/components/term/fileSystem.js');
const fsJson = require('./testFileSystem.json');

beforeAll(() => {
    fileSystem.setFs(fsJson);
});

describe('objAtPath', () => {

	test('no path', () => {
		let res = fileSystem.objAtPath([]);
		expect(res).toBe(null);
	});
	
	test('null path', () => {
		let res = fileSystem.objAtPath(null);
		expect(res).toBe(null);
	});
	
	test('/', () => {
		let res = fileSystem.objAtPath(['/']);
		expect(res).toBe(fsJson);
	});
	
	test('/photos/img1.jpg', () => {
		let expected = {
			name: "img1.jpg",
			type: "file"
		};
		let res = fileSystem.objAtPath(['photos', 'img1.jpg']);
		expect(res).toEqual(expected);
	});
	
	test('/photos/', () => {
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

});

describe('ls', () => {

	test('no path', () => {
		let expected = 'photos file1.txt';
		let res = fileSystem.ls('');
		expect(res).toEqual(expected);
	});

	test('empty path', () => {
		let expected = 'photos file1.txt';
		let res = fileSystem.ls();
		expect(res).toEqual(expected);
	});
	
	test('null path', () => {
		let expected = 'photos file1.txt';
		let res = fileSystem.ls(null);
		expect(res).toEqual(expected);
	});
	
	test('incorrectly typed path', () => {
		let expected = 'photos file1.txt';
		let res = fileSystem.ls(12345);
		expect(res).toEqual(expected);
	});

	test('bad path', () => {
		let expected = 'photos file1.txt';
		let res = fileSystem.ls('/this is a bad path');
		expect(res).toEqual(expected);
	});
	
	test('/photos', () => {
		let expected = 'img1.jpg img2.png';
		let res = fileSystem.ls('/photos');
		expect(res).toEqual(expected);
	});

});