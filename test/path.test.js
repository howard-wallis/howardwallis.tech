const path = require('../src/components/term/path.js');

test('parsePath no path', () => {
	let res = path.parsePath('');
	expect(res).toBe(null);
});

test('parsePath null path', () => {
	let res = path.parsePath(null);
	expect(res).toBe(null);
});

test('parsePath / path', () => {
	let res = path.parsePath('/');
	expect(res).toEqual([]);
});