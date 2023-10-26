const albumsController = require("../controllers/AlbumsController.js")
module.exports = (app) => {
    app.route("/albums")
        .get(albumsController.getAll)
        .post(albumsController.createNew) //Create
    app.route("/albums/:id")
        .get(albumsController.getById)   //Read
        .put(albumsController.editById)  //Update
        .delete(albumsController.deleteById) //Delete
}