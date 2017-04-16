const data = require("../data");
const bookData = data.book;
const userRoutes = require("./user");
const bookRoutes = require("./book");
//const messageBoardRoutes = require("./messageBoard");
//const router = express.Router();

const constructorMethod = (app) => {
    app.use("/users", userRoutes);
    
    app.use("/books", bookRoutes);
    //app.use("/messages", messageBoardRoutes);

    
   app.get("/", (req, res) => {
        bookData.getAllBooks().then((bookList) => {
            res.json(bookList);
        }, () => {
            // Something went wrong with the server!
            res.sendStatus(500);
        });
    });
    
    
}



module.exports = constructorMethod;