/* Import */
const vPage = require("../view/page"),
      meWeb = require("../library/meWeb"),
      route = new meWeb().route();

      
/* Main */
route.get('', vPage.home);
route.get('api', vPage.api);
route.get('doc', vPage.doc);
route.get('contact', vPage.contact);
route.get('*', vPage.error);
route.get('request', vPage.request);


/* Export */
module.exports = route;