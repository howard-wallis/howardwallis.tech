const fileSystem = require('../../src/components/term/fileSystem.js');
const fsJson = require('../testFileSystem.json');
const ls = require('../../src/components/term/commands/ls.js').ls;

beforeAll(() => {
    fileSystem.setFs(fsJson);
});

let currentPath = fileSystem.getCurrentPath;

describe('ls', () => {

	test('root', () => {
        let res = ls('')[0];
        expect(res).toMatch('photos');
        expect(res).toMatch('file1.txt');
        expect(res).not.toMatch('img');
    });

    test('real path', () => {
        let res = ls('photos')[0];
        expect(res).toMatch('jpg');
        expect(res).toMatch('png');
        expect(res).not.toMatch('file1');
    });
    
    test('junk path returns error message', () => {
        let res = ls('potato');
        expect(res).toMatch('');
    });

});
