import {ls, cd, getCurrentPath} from './fileSystem.js';

const promptPrefix = 'anon@howardwallis.tech';

// state
let _currentLine;
let _term;

let init = term => {
	_term = term;
	_currentLine = '';
	printPrompt();
};

let printPrompt = () => {
	_term.write(`${promptPrefix} ${getCurrentPath()}$ `);
};

let keyHandler = (key, e) => {
	let printable = (
		!e.altKey && !e.altGraphKey && !e.ctrlKey && !e.metaKey && key.length === 1
	);

	switch (e.keyCode) {
		// TODO handle arrow keys and delete
		case 13: // Enter
			_term.write('\r\n');
			handleLine(_currentLine);
			_currentLine = '';
			printPrompt();
			break;

		case 8: // Backspace
			if (_currentLine) {
				_currentLine = _currentLine.slice(0, -1);
				_term.write('\b \b');
			}
			break;

		default:
			console.log(e.keyCode, key);
			if (printable) {
				_currentLine += key;
				_term.write(key);
			}
			break;
	}
};

let handleLine = line => {
    var components = extractCommand(line);
    console.log(components);

    let command = components[0];

    switch (command) {
        case 'ls':
            _term.writeln(ls(components[1]));
            break;
        case 'cd':
            cd(components[1]);
            break;
        case 'help':
            _term.writeln('Available commands: ls cd help');
            break;
        default:
            _term.writeln(`Unrecognised command ${command}. Type 'help' to list commands`);
            break;
    }
};

// String line e.g. 'ls -al ./folder' -> array of components e.g. ['ls', './folder', 'a', 'l']
let extractCommand = line => {
    // upgrade to regex parsing
    return line.split(/\s+/);
}

export {
	init,
	keyHandler
};