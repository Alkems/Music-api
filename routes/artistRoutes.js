const artistsController = require("../controllers/artistsController.js")
module.exports = (app) => {
    app.route("/artists")
        .get(artistsController.getAll)
        .post(artistsController.create) //Create
    app.route("/artists/:id")
        .get(artistsController.getById)   //Read
        .put(artistsController.editById)  //Update
        .delete(artistsController.deleteById) //Delete
}