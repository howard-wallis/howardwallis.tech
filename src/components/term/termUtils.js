import { ls, cd, getCurrentPath } from './fileSystem.js';

const AnsiColours = {
	Reset: "\x1b[0m",
	Bright: "\x1b[1m",
	Dim: "\x1b[2m",
	Underscore: "\x1b[4m",
	Blink: "\x1b[5m",
	Reverse: "\x1b[7m",
	Hidden: "\x1b[8m",

	FgBlack: "\x1b[30m",
	FgRed: "\x1b[31m",
	FgGreen: "\x1b[32m",
	FgYellow: "\x1b[33m",
	FgBlue: "\x1b[34m",
	FgMagenta: "\x1b[35m",
	FgCyan: "\x1b[36m",
	FgWhite: "\x1b[37m",

	BgBlack: "\x1b[40m",
	BgRed: "\x1b[41m",
	BgGreen: "\x1b[42m",
	BgYellow: "\x1b[43m",
	BgBlue: "\x1b[44m",
	BgMagenta: "\x1b[45m",
	BgCyan: "\x1b[46m",
	BgWhite: "\x1b[47m",
};

// state
let _currentLine;
let _term;

let init = term => {
	_term = term;
	_currentLine = '';
	printPrompt();
};

let printPrompt = () => {
	let prefix = colourText('anon@hw.t', AnsiColours.FgCyan);
	let separator = colourText(':', AnsiColours.Bright);
	let path = colourText(getCurrentPath(), AnsiColours.FgBlue);
	_term.write(prefix + separator + path + '$ ');
};

let colourText = (text, colour) => `${colour}${text}${AnsiColours.Reset}`;

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