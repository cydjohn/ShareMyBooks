const data = require("../data");
const bookData = data.books;

//const router = express.Router();

const constructorMethod = (app) => {

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