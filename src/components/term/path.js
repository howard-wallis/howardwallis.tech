let parsePath = path => {
    return isPath(path)
        ? path.split('/').filter(c => c !== '/' && c !== '')
        : null;
}

let isPath = pathString => {
    // Possibly a slash, 
    // then any number of alphanumeric or dashes followed by slashes
    const pathValidationRegex = /^\/?(?:[\w-]+\/?)*$/;
    return pathString && pathValidationRegex.test(pathString);
}

let isFilePath = pathString => {
    // Possibly a slash, 
    // then one or more alphanumeric or dashes followed by slashes,
    // then possibly some more alphanumeric or dashes or dots
    const filePathValidationRegex = /^\/?(?:[\w-]+\/?)+[\w-.]*$/;
    return pathString && filePathValidationRegex.test(pathString);
}

let isFromRoot = pathString => {
    return pathString[0] == '/' || pathString[0] == '\\';
}

export {
    parsePath,
    isPath,
    isFilePath,
    isFromRoot
}