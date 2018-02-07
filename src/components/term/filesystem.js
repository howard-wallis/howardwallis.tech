const fs = { // move to json file
    "path": "root",
    "name": "root",
    "type": "directory",
    "children": [
      {
        "path": "summer",
        "name": "summer",
        "type": "directory",
        "children": [
          {
            "path": "summer/june",
            "name": "june",
            "type": "directory",
            "children": [
              {
                "path": "summer/june/windsurf.jpg",
                "name": "windsurf.jpg",
                "type": "file"
              }
            ]
          }
        ]
      },
      {
        "path": "winter",
        "name": "winter",
        "type": "directory",
        "children": [
          {
            "path": "winter/january",
            "name": "january",
            "type": "directory",
            "children": [
              {
                "path": "winter/january/ski.png",
                "name": "ski.png",
                "type": "file"
              },
              {
                "path": "winter/january/snowboard.jpg",
                "name": "snowboard.jpg",
                "type": "file"
              }
            ]
          }
        ]
      }
    ]
}

let currentPath = '';

let objAtPath = path => {
    if (!path || path == '/' || path == '\\') {
        return fs;
    }

    let components = path.split('/').filter(c => c !== '/')

    let res = fs['root'];
    components.forEach(element => {
        res = res[components];
    });
    return res;
}

var pathOfObj = fsObj => {
    // recursive query until you find the obj
}

let ls = () => {
    return objAtPath(currentPath).children.map(c => c.name);
}

export let filesystem = {
    ls,
    cd
}