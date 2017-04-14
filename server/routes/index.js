const data = require("../data");
const bookData = data.books;
const userRoutes = require("./user");
const bookRoutes = require("./book");
//const router = express.Router();

const constructorMethod = (app) => {
    app.use("/users", userRoutes);
    
    app.use("/books", bookRoutes);

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