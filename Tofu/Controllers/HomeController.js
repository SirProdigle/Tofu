const appRoot = require("app-root-path");
const Controller = require(`${appRoot}/Engine/Controller`);
       
    class HomeController extends Controller {
        constructor() {
            super('/');
            
            this.router.get('/', (req, res) => {
                res.render("index");
            });
        
        }
    }
            
const Con = new HomeController();
module.exports = Con.router;