/* Import */
const { static, render, redirect, writeFile } = require("../library/meWebTool");


/* Main */
const user = (req, res) => {
    return render(200, static("db", "db.json"), "application/json");
};

const userID = (req, res, parm) => {
    let content = JSON.parse(static("db", "db.json"))[parm.id];
    return render(200, JSON.stringify(content), "application/json");
};

const addUser = (req, res, parm) => {
    let read = JSON.parse(static("db", "db.json")),
        _ = parm.query;
    read[new Date().getTime()] = {
        name: _.name, age: _.age,
        city: _.city, active: _.active,
    };
    writeFile(JSON.stringify(read), "db","db.json");
    return redirect(303, '/api/v1/user');
};

const removeUser = (req, res, parm) => {
    let read = JSON.parse(static("db", "db.json"));
    read = Object.entries(read).filter(i => i[0]!==parm.id);
    read = Object.fromEntries(read);
    writeFile(JSON.stringify(read), "db","db.json");
    return redirect(303, '/api/v1/user');
};

const updateUser = (req, res, parm) => {
    let read = JSON.parse(static("db", "db.json")),
        data = read[parm.id];
    
    if (data) {
        for (let i in parm.query) { data[i] = parm.query[i] };
        read[parm.id] = data;
        writeFile(JSON.stringify(read), "db","db.json");
    };    
    return redirect(303, '/api/v1/user');
};


/* Export */
module.exports = vApi = {
    user,
    userID,
    addUser,
    removeUser,
    updateUser
};