const songAlbumsController = require("../controllers/SongAlbumsController.js")
module.exports = (app) => {
    app.route("/songalbums")
        .get(songAlbumsController.getAll)
        .post(songAlbumsController.createNew) //Create
    app.route("/songalbums/:id")
        .get(songAlbumsController.getById)   //Read
        .put(songAlbumsController.editById)  //Update
        .delete(songAlbumsController.deleteById) //Delete
}