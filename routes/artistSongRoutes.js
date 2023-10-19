const artistSongController = require("../controllers/artistSongsController.js")
module.exports = (app) => {
    app.route("/artistSongs")
        .get(artistSongController.getAll)
        .post(artistSongController.createNew) //Create
    app.route("/artistSongs/:id")
        .get(artistSongController.getById)   //Read
        .put(artistSongController.editById)  //Update
        .delete(artistSongController.deleteById) //Delete
}