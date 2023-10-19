const songsController = require("../controllers/SongsController.js")
module.exports = (app) => {
    app.route("/songs")
        .get(songsController.getAll)
        .post(songsController.createNew) //Create
    app.route("/songs/:id")
        .get(songsController.getById)   //Read
        .put(songsController.editById)  //Update
        .delete(songsController.deleteById) //Delete
}