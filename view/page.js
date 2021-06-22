/* Import */
const { static, render } = require("../library/meWebTool");
const fs = require("fs");


/* Main */
const home = (req, res) => {
    return render(200, static('index.html'));
};
const api = (req, res) => {
    return render(200, static('page', 'api.html'));
};
const doc = (req, res) => {
    return render(200, static('page', 'doc.html'));
};
const contact = (req, res) => {
    return render(200, static('page', 'contact.html'));
};
const error = (req, res) => {
    return render(200, static('page', 'error.html'));
};
const request = (req, res) => {
    return render(200, static('page', 'request.html'));
};


/* Export */
module.exports = vPage = {
    home,
    api,
    doc,
    contact,
    error,
    
    request
};