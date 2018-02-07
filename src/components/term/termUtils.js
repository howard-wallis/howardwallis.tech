console.log('loaded the module')

const promptPrefix = 'anon@howardwallis.tech'

// state
let _currentLine;
let _term;

let init = term => {
    _term = term;
    _currentLine = '';
    printPrompt();
}

let printPrompt = text => {
    _term.write(text ? `${promptPrefix} ${text}$ ` : `${promptPrefix}$ `);
}

let keyHandler = (key, e) => {
    const re = /^\P{Cc}$/
    let printable = (
        !e.altKey && !e.altGraphKey && !e.ctrlKey && !e.metaKey && key.length === 1
        // && (
        //     (e.keyCode >= 48 && e.keyCode <= 90) // 0-9a-z
        //     || (e.keyCode >= 96 && e.keyCode <= 105) // numpad 0-9
        //     || (e.keyCode >= 186 && e.keyCode <= 222) // ; - '
        // ) // https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
        // TODO add more special chars e.g. \
    );

    switch (e.keyCode) {
        // TODO handle arrow keys and delete
        case 13: // Enter
            _term.write('\r\n');
            handleInput(_currentLine);
            _currentLine = '';
            printPrompt();
            break;

        case 8: // backspace
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
}

let handleInput = line => {
    console.log(line);
    if (line === 'ls') {
        _term.writeln('.. . file1 file2 file3');
    } else if (line === 'help') {
        _term.writeln('Available commands: ls cd cat help')
    } else {
        _term.writeln(`Unrecognised command ${line}. Type 'help' to list commands`);
    }

    // ls
    // cd
    // filesystem
    // cat
    // help
}

export let termUtils = {
    init,
    keyHandler
}