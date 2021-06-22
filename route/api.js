/* Import */
const vApi = require("../view/api"),
      meWeb = require("../library/meWeb"),
      route = new meWeb().route();

      
/* Main */
route.get('', vApi.user);
route.get('/:id', vApi.userID);
route.post('/add/query?', vApi.addUser);
route.post('/remove/:id', vApi.removeUser);
route.post('/update/:id/query?', vApi.updateUser);


/* Export */
module.exports = route;