const bookRoutes=require("./infobooks");
const userRoutes = require("./infousers");


const constructorMethod = (app) => {
    app.use("/books", bookRoutes);
    app.use("/users", userRoutes);
    

    app.use("*", (req, res) => {
        res.status(404).json({error: "Not found"});
    });
};

module.exports = constructorMethod;