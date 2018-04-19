const fileSystem = require('../../src/components/term/fileSystem.js');
const fsJson = require('../testFileSystem.json');
const cd = require('../../src/components/term/commands/cd.js').cd;

beforeAll(() => {
    fileSystem.setFs(fsJson);
});

let currentPath = fileSystem.getCurrentPath;

describe('cd', () => {

	test('multiple change directories', () => {
        let res = cd('photos');
        let path = currentPath();
        expect(res).toEqual(null);
        expect(path).toEqual(['photos']);
        
        res = cd('asdfasdfasdf');
        path = currentPath();
        expect(res).toMatch(''); // check that it is a string
        expect(path).toEqual(['photos']);

        res = cd('..');
        path = currentPath();
        expect(res).toEqual(null);
        expect(path).toEqual([]);
    });
    
});
