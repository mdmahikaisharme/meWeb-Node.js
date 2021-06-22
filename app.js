/* Import */
const meWeb = require("./library/meWeb"),
      routeApi = require("./route/api"),
      routePage = require("./route/page");


/* Global */
const PORT = 8621,
      app = new meWeb();


/* Main */
app.addRoute('/', routePage);
app.addRoute('/api/v1/user', routeApi);


/* Run */
app.run(PORT, ()=> console.log(`Server running at http://127.0.0.1:${PORT}`));