/* Import */
const { createServer } = require("http"),
      { createUrlReg, extractor, queryString, static } = require("./meWebTool");
const Static = static;


// ============      meWeb      ============
class meWeb {
    constructor() {
        this.router = {
            "page": {"GET":{}, "POST":{}},
            "parm": {"GET":{}, "POST":{}},
            "static": {"html":"text/html", "css":"text/css", "js":"text/script", "json": "application/json",
                       "jpg":"image/jpg", "jpeg":"image/jpeg", "png":"image/png", "gif": "image/gif",
                       "audio":"application/audio", "video":"application/video"}
        };
        this.func;
        this.staticRun = false;
        // Regular Expression
        this.sign = `a-zA-Z0-9\\-\\_\\?\\#\\&\\+\\=\\%`;
        this.regStatic = `^((\\/[${this.sign}]+)+)?\\/([${this.sign}\\.?]+\\.(?<ext>[${this.sign}]+))$`;//canbe(root) Static Must have '.'
        this.regParm = `(\\/[${this.sign}]+)+$`;
    };
    
    
    //// Run ////
    run(port=8080, callback) {
        createServer((req, res) => {
            /* Request Deatail */
            let method = req.method,
                url = '/'+req.url.split('/').filter(i => (i=='') ? false:true).join('/');
            console.log(method, url);

            // Phrase URL
            const isRouter = this.router.page[method][url] || null,
                isStatic = url.match(this.regStatic),
                isParm = url.match(this.regParm);
            
            // Routing
            if (isRouter) { extractor(isRouter(req, res), res) }

            else if (url.includes('.') && isStatic) {
                try {
                    this.func = {
                        func: 'render',
                        arg: {
                            status: 200,
                            content: Static(...url.split('/').splice(1)),
                            contentType: this.router.static[isStatic.groups.ext] || "text/plain"
                        }
                    };
                    extractor(this.func, res);
                } catch { this.pageNotFound(req, res) };
            }
            
            else if (url.includes('?') || isParm) {
                let match, parm;
                for (let i in this.router.parm[method]) {
                    match = url.match(i);
                    if (url.match(i)) {
                        parm = match.groups;

                        parm["query"] && ( parm=queryString(parm) );
                        extractor(this.router.parm[method][i](req, res, parm), res);
                        this.staticRun = true;
                        break;
                    };
                };
                (!this.staticRun) && this.pageNotFound(req, res);
            } 
            else { this.pageNotFound(req, res) };

            // // Re Define
            this.func = null;
            this.staticRun = false;
        }).listen(port, callback())
    };

    
    //// Add Router ////
    addRouter(method, url, func) {
        const type = (url.includes(':') || url.includes('?')) ? "parm":"page",
              URL = (type==='page') ? url:createUrlReg(url);
        this.router[type][method][URL] = func;
    };
    //// Router Method ////
    get(url, func) { this.addRouter("GET", url, func) };
    post(url, func) { this.addRouter("POST", url, func) };


    //// Route ////
    route() { return new route() };
    addRoute(url, route) {
        let _route = route;
        while (true) {
            if(_route["GET"]) { break };
            _route = _route.route
        };
        // GET
        for (let i in _route["GET"]) { this.addRouter("GET", url+i, _route["GET"][i]) };
        // Post
        for (let i in _route["POST"]) { this.addRouter("POST", url+i, _route["POST"][i]) };
    };

    //// Page Not Found ////
    pageNotFound(req, res) { extractor(this.router.page["GET"]["/*"](req, res), res) };
};


// ============      route      ============
class route {
    constructor() { this.route = {"GET": {}, "POST": {}} };
    get(url, func) { this.route.GET[url] = func };
    post(url, func) { this.route.POST[url] = func };
};


/* Export */
module.exports = meWeb;