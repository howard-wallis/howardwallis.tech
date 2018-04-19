import { parsePath } from '../path';
import { AnsiColours, colourText } from '../colour';
import { objAtPath, getCurrentPath } from '../fileSystem';

let itemsAtPath = pathString => {
    const path = typeof (pathString) === 'string'
        ? parsePath(pathString) || getCurrentPath()
        : getCurrentPath();

    return objAtPath(path).children;
};

let formatFiles = items => {
    // ANSI escape sequences are counted for tab calculations despite not being printed.
    // This will offset them so that tabulation looks correct
    const colourHackSpaces = '        ';
    let colouredItems = items.map(x => x.type === 'folder'
        ? colourText(x.name, AnsiColours.Reverse) + colourHackSpaces
        : x.name);

    let res = [];
    while (colouredItems.length > 0) {
        let row = colouredItems.splice(0, 4).join('\t');
        res.push(row);
    }
    return res;
};

// Returns an array of lines to print
let ls = pathString => {
    const items = itemsAtPath(pathString);
    return formatFiles(items);
};

export {
    ls
};