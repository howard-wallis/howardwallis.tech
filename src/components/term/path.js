let parsePath = pathString => {
    let path = pathString && (isPath(pathString) || isPath(pathString + '/'))
        ? pathString.split('/').filter(
            c => c !== '/' && c !== '' && c !== '.')
        : null;

    if (!path) return path;

    for (let i = 0; i < path.length; i++) {
        if (path[i] === '..') {
            if (i > 0)
                path.splice(i - 1, 2);
            else
                path.splice(i, 1);
        }
    }

    return path;
}

let isPath = pathString => {
    // Possibly a slash,
    // then (any number of alphanumeric or dashes) or (one or two dots) followed by slashes
    const pathValidationRegex = /^\/?(?:(?:[\w-]+\/?)|(?:\.{1,2}\/))*$/;
    return pathString && pathValidationRegex.test(pathString);
};

let isFilePath = pathString => {
    const filePathValidationRegex = /^\/?(?:(?:[\w-]+\/?)|(?:\.{1,2}\/))*(?:\.[\w-]+)+$/;
    return pathString && filePathValidationRegex.test(pathString);
};

let isFromRoot = pathString => pathString && pathString[0] === '/' || pathString[0] === '\\';

export {
    parsePath,
    isPath,
    isFilePath,
    isFromRoot
};