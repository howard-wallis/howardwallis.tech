const fileSystem = require('../src/components/term/fileSystem.js');
const fsJson = require('../src/components/term/fileSystem.json');

test('objAtPath no path', () => {
	let res = fileSystem.objAtPath('');
	expect(res).toBe(fsJson);
});

test('objAtPath null path', () => {
	let res = fileSystem.objAtPath(null);
	expect(res).toBe(fsJson);
});

test('objAtPath / path', () => {
	let res = fileSystem.objAtPath('/');
	expect(res).toBe(fsJson);
});

test('objAtPath \\ path', () => {
	let res = fileSystem.objAtPath('\\');
	expect(res).toBe(fsJson);
});

test('objAtPath /photos/img1.jpg', () => {
	let expected = {
		name: "img1.jpg",
		type: "file"
	}
	
	let res = fileSystem.objAtPath('/photos/img1.jpg');
	expect(res).toEqual(expected);
});

test('objAtPath /photos/', () => {
	let expected = {
		"name": "photos",
		"type": "directory",
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
	}
	
	let res = fileSystem.objAtPath('/photos/');
	expect(res).toEqual(expected);
});

test('ls no path', () => {
	let expected = ['photos', 'file1.txt']
	let res = fileSystem.ls('');
	expect(res).toEqual(expected);
});

test('ls /photos path', () => {
	let expected = ['img1.jpg', 'img2.png']
	let res = fileSystem.ls('/photos');
	expect(res).toEqual(expected);
});