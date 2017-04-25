
const userRoutes = require("./user");
const bookRoutes = require("./book");
const privateMessageRoutes = require("./privateMessage");
//const router = express.Router();

const constructorMethod = (app) => {
    app.use("/users", userRoutes);
    
    app.use("/books", bookRoutes);
    
    app.use("/private_messages", privateMessageRoutes);

    
   app.get("/", (req, res) => {
        //needs to be a redirect to the home page route
    });
    
    
}



module.exports = constructorMethod;