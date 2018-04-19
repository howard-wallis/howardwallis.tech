const fileSystem = require('../src/components/term/fileSystem.js');
const fsJson = require('./testFileSystem.json');

beforeAll(() => {
    fileSystem.setFs(fsJson);
});

describe('objAtPath', () => {

	test('no path', () => {
		let res = fileSystem.objAtPath([]);
		expect(res).toBe(fsJson);
	});
	
	test('null path', () => {
		let res = fileSystem.objAtPath(null);
		expect(res).toBe(fsJson);
	});
	
	test('/', () => {
		let res = fileSystem.objAtPath([]);
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

describe('get and set path', () => {
	
	beforeEach(() => {
		fileSystem.setCurrentPath([]);
	})

	test('a good path', () => {
		let original = fileSystem.getCurrentPathString();
		expect(original).toBe('/');
	
		let success = fileSystem.setCurrentPath(['photos']);
		let updated = fileSystem.getCurrentPathString();

		expect(success).toBe(true);
		expect(updated).toBe('/photos/');
	});
	
	test('a bad path', () => {
		let original = fileSystem.getCurrentPathString();
		expect(original).toBe('/');
	
		let expected = ['nothing', 'at', 'this', 'path'];
		let success = fileSystem.setCurrentPath(expected);
		let updated = fileSystem.getCurrentPathString();

		expect(success).toBe(false);
		expect(updated).toBe('/');
	});

});

describe('append and get path', () => {

	beforeEach(() => {
		fileSystem.setCurrentPath([]);
	})

	test('a good path', () => {
		let original = fileSystem.getCurrentPathString();
		expect(original).toBe('/');
	
		let success = fileSystem.appendCurrentPath(['photos']);
		let updated = fileSystem.getCurrentPathString();

		expect(success).toBe(true);
		expect(updated).toBe('/photos/');
	});
	
	test('a bad path', () => {
		let original = fileSystem.getCurrentPathString();
		expect(original).toBe('/');
	
		let expected = ['nothing', 'at', 'this', 'path'];
		let success = fileSystem.appendCurrentPath(expected);
		let updated = fileSystem.getCurrentPathString();

		expect(success).toBe(false);
		expect(updated).toBe('/');
	});

});

describe('cd', () => {

});