const promptPrefix = "anon@howardwallis.tech"

console.log("loaded the module")

// state
let currentLine = '';

let printPrompt = text => {
    return text ? `${promptPrefix} ${text}$ ` : `${promptPrefix}$ `;
}

let keyHandler = (key, e, term) => {
    var printable = (
        !e.altKey && !e.altGraphKey && !e.ctrlKey && !e.metaKey
    );

    if (e.keyCode == 13) {
        term.write('\r\n' + printPrompt());
    } else if (e.keyCode == 8) {
        // Do not delete the prompt
        // if term.x which doesn't exist any more
        console.log(term)
        term.write('\b \b');
    } else if (printable) {
        term.write(key);
    }
}

export var termUtils = {
    printPrompt,
    keyHandler
}