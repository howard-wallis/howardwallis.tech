let _current;
let _commandHistory = [];
let _commandFuture = [];

let getCurrent = () => _current;

let rewind = () => {
    if (_current) _commandFuture.unshift(_current);
    _current = _commandHistory.pop() || null;
};

let forward = () => {
    if (_current) _commandHistory.push(_current);
    _current = _commandFuture.shift() || null;
};

let reset = newCurrent => {
    if (newCurrent) _commandHistory.push(newCurrent);
    
    _commandHistory = _commandHistory.concat(_commandFuture);
    _current = null;
    _commandFuture = [];
};

export {
    getCurrent,
    rewind,
    forward,
    reset
};