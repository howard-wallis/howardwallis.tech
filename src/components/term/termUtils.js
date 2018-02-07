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
    let printable = (
        !e.altKey && !e.altGraphKey && !e.ctrlKey && !e.metaKey && (
            (e.keyCode >= 48 && e.keyCode <= 90) // 0-9a-z
            || (e.keyCode >= 96 && e.keyCode <= 105) // numpad 0-9
            || (e.keyCode >= 186 && e.keyCode <= 222) // ; - '
        ) // https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    );

    switch (e.keyCode) {
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
}

export let termUtils = {
    init,
    keyHandler
}