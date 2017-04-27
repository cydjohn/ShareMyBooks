
const userRoutes = require("./user");
const bookRoutes = require("./book");
const userRequestsRoutes = require("./userRequests")
//const messageBoardRoutes = require("./messageBoard");
//const router = express.Router();

const constructorMethod = (app) => {
    app.use("/users", userRoutes);
    
    app.use("/books", bookRoutes);
    app.use("/userRequests",userRequestsRoutes);
    //app.use("/messages", messageBoardRoutes);
    
   app.get("/", (req, res) => {
        //needs to be a redirect to the home page route
    });
    
    
}



module.exports = constructorMethod;