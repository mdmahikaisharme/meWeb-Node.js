/* Import */
const _path = require("path"),
      fs = require("fs");


/* Main */
let dir = "public";

// ============      Path      ============
const joinPath = (...path) => _path.join(...path);


// ============      Static      ============
const setStatic = (dirname) => { dir=dirname };
const static = (...path) => {
    const abspath = joinPath(process.cwd(), dir, ...path);
    return readFile(abspath, 'utf-8');
};


// ============      File      ============
const readFile = (path) => fs.readFileSync(path, 'utf-8');
const writeFile = (data, ...path) => {
    const abspath = joinPath(process.cwd(), dir, ...path);
    return fs.writeFileSync(abspath, data);
};


// ============      Render      ============
const render = (status, content, contentType='text/html') => {
    return {
        func: 'render',
        arg: { status, content, contentType }
    };
};
const redirect = (status, location) => {
    return {
        func: 'redirect', 
        arg: { status, location }
    };
};
const rendor = (arg, res) => {
    res.writeHead(arg.status, {'Content-Type': arg.contentType});
    res.write(arg.content);
    res.end();
};
const redirector = (arg, res) => {
    res.writeHead(arg.status, {'Location': arg.location});
    res.end();
};
const extractor = (func, res) => {
    (func.func === 'render') ? rendor(func.arg, res) : redirector(func.arg, res);
};


// ============      URL      ============
const createUrlReg = (url) => {
    const array = url.split('/').splice(1);
    let reg = array.map((i) => {
        // : String
        if (i.startsWith(':')) {
            return `(?<${i.slice(1)}>[a-zA-Z0-9\\-\\_\\+\\%]+)`;
        } // Query
        if (i.startsWith('query?')) {
            return `query\\?(?<query>[a-zA-Z0-9\\-\\_\\&\\+\\=\\%]+)`;
        } // String
        return `${i}`;
    }).join('\\/')+'$';
    return '\\/'+reg;
};
const queryString = (obj) => {
    let query = obj.query,
        array = (query.includes('&') && query.split('&')) || Array(query);
    array = array.map(i => i.split('='));
    array = JSON.stringify(array).split('%20').join(' '); // remove '%20' => ' '
    obj["query"] = Object.fromEntries( JSON.parse(array) );
    return obj
};


/* Export */
module.exports = {
    joinPath,

    setStatic,
    static,

    readFile,
    writeFile,

    render,
    redirect,
    rendor,
    redirector,
    extractor,

    createUrlReg,
    queryString
};