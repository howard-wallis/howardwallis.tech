const history = require('../src/components/term/history.js');

describe('history', () => {

    beforeEach(() => {
        while(history.getCurrent() !== null) {
            history.forward(); // reset to the front of history each time
        }
    })

    test('nothing by default', () => {
        expect(history.getCurrent()).toBeFalsy();
    });

    test('can write and read', () => {
        history.reset('first command');
        history.rewind();
        expect(history.getCurrent()).toEqual('first command');
    });

    test('can rewind multiple', () => {
        history.reset('first command');
        history.reset('second command');
        history.rewind();
        expect(history.getCurrent()).toEqual('second command');
        history.rewind();
        expect(history.getCurrent()).toEqual('first command');
    });

    test('can rewind and forward multiple', () => {
        history.reset('first command');
        history.reset('second command');
        history.rewind();
        expect(history.getCurrent()).toEqual('second command');
        history.rewind();
        expect(history.getCurrent()).toEqual('first command');
        history.forward();
        expect(history.getCurrent()).toEqual('second command');
    });

    test('another forward nulls current', () => {
        history.reset('first command');
        history.reset('second command');
        history.rewind();
        expect(history.getCurrent()).toEqual('second command');
        history.rewind();
        expect(history.getCurrent()).toEqual('first command');
        history.forward();
        expect(history.getCurrent()).toEqual('second command');
        history.forward();
        expect(history.getCurrent()).toBeFalsy();
    });

});