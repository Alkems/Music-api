const genresController = require("../controllers/GenresController.js")
module.exports = (app) => {
    app.route("/genres")
        .get(genresController.getAll)
        .post(genresController.createNew) //Create
    app.route("/genres/:id")
        .get(genresController.getById)   //Read
        .put(genresController.editById)  //Update
        .delete(genresController.deleteById) //Delete
}