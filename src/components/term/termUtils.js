import { getCurrentPathString } from './fileSystem';
import { AnsiColours, colourText } from './colour';
import { cd, ls } from './commands/commands';
import * as history from './history';

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

const helpText = `Fake bash. The following shell commands are available:
                  ${colourText('ls\tcd\tvi\tless\thelp', AnsiColours.FgGreen)}`;
                  
const failureText = command =>
    `No command ${colourText(command, AnsiColours.FgRed)} found. Type 'help' to see available commands.`;

let keyHandler = (key, e) => {
    let printable = (
        !e.altKey && !e.altGraphKey &&
        !e.ctrlKey && !e.metaKey && key.length === 1
    );

    switch (e.key) {
    case 'Enter':
        _term.write('\r\n');
        if (_currentLine) {
            handleLine(_currentLine);
        }
        _currentLine = '';
        printPrompt();
        break;

    case 'Backspace':
        if (_currentLine) {
            _currentLine = _currentLine.slice(0, -1);
            _term.write('\b \b');
        }
        break;
		
    case 'ArrowUp':
        clearLine();
        history.rewind();
        _currentLine = history.getCurrent() || '';
        _term.write(_currentLine);
        break;

    case 'ArrowDown':
        clearLine();
        history.forward();
        _currentLine = history.getCurrent() || '';
        _term.write(_currentLine);
        break;

    default:
        if (printable) {
            _currentLine += key;
            _term.write(key);
        }
        break;
    }
};

let clearLine = () => {
    if (!_currentLine) {
        _currentLine = '';
        return;
    }
    for (let i = 0; i < _currentLine.length; i++) {
        _term.write('\b \b');
    }
};

let handleLine = line => {
    history.reset(line);
    let components = extractCommand(line);
    let command = components[0];
    let res;

    switch (command) {
    case 'ls':
        res = ls(components[1]);
        if (Array.isArray(res)) res.map(x => _term.writeln(x));
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
        _term.writeln(failureText(command));
        break;
    }
};

// String line e.g. 'ls -al ./folder' -> object of components
// e.g. {command: ls, flags: [a,l], object: file.txt}
let extractCommand = line =>
    // upgrade to regex parsing
    line.split(/\s+/);

export {
    init,
    keyHandler
};