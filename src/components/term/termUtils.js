import { getCurrentPathString } from './fileSystem';
import { AnsiColours, colourText } from './colour';
import { cd, ls } from './commands/commands';

// state
let _currentLine;
let _term;

let init = term => {
    _term = term;
    _currentLine = '';
    printPrompt();
};

let printPrompt = () => {
    let prefix = colourText('anon@hw.t', AnsiColours.FgGreen);
    let path = colourText(getCurrentPathString(), AnsiColours.FgBlue);
    _term.write(prefix + ':' + path + '$ ');
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
        if (printable) {
            _currentLine += key;
            _term.write(key);
        }
        break;
    }
};

let handleLine = line => {
    let components = extractCommand(line);
    let command = components[0];
    let res;

    switch (command) {
    case 'ls':
		res = ls(components[1])
		if (Array.isArray(res)) res.map(x => _term.writeln(x))
		else _term.writeln(res);
        break;
    case 'cd':
        res = cd(components[1]);
        if (res) _term.writeln(res);
        break;
    case 'help':
        _term.writeln(helpText);
        break;
    default:
        _term.writeln(`No command ${colourText(command, AnsiColours.FgRed)} found. Type 'help' to see available commands.`);
        break;
    }
};

const helpText = `Fake bash. The following shell commands are available:
				  ${colourText('ls\tcd\tvi\tless\thelp', AnsiColours.FgGreen)}`;

// String line e.g. 'ls -al ./folder' -> object of components e.g. {command: ls, flags: [a,l], object: file.txt}
let extractCommand = line =>
    // upgrade to regex parsing
	 line.split(/\s+/);


export {
    init,
    keyHandler
};