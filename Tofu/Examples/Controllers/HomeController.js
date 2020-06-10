const appRoot = require("app-root-path");
const Controller = require(`${appRoot}/Engine/Controller`); //Require base class controller to extend from
const BigBeepMiddleware = require("../Middleware/General/PrintBigBeep"); //Load in a generic middleware

/*
* MiddleWare
* Startup that should be applied to all routes in a controller should be placed in a file Startup/Controller/ControllernameMiddleware
* e.g for this, Startup/Controller/HomeMiddleware
* Naming is important as controller specific middleware are loaded dynamically, examples can be found in the middleware folder, the name it uses is inside super("") in the constructor below
*
* Generic middleware can be placed anywhere but I have made a generic folder for it just as an idea, it exports a function and has been included as seen in the / route below
* */
class HomeController extends Controller{

    constructor(){
        super(""); //This dictates the /thing that precedes this router, e.g if super("test") then all routes follow /test, so a get of "/about" would be /test/about
        //I use this as a way to easily set the path via a function, it also reads the middleware location for the controller from the string inside super

        this.router.get('/', BigBeepMiddleware, function (req, res) {
            res.send('Index page for /')
        });
    }

}

//End each controller by making an instance of it and exporting the router inside it, that is all that is required, the system dynamically adds all controllers at server start
const Con = new HomeController();
module.exports = Con.router;