const players = require("../artists/data")
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdArtist = players.create({
        name: req.body.name
    })
    res.status(201)
        .location(`${getBaseurl(req)}/artists/${createdArtist.id}`)
        .send(createdArtist)
}
// READ
exports.getAll = (req, res) => {
    res.send(artists.getAll())
}
exports.getById = (req, res) => {
    const foundArtist = players.getById(req.params.id)
    if (foundArtist === undefined) {
        return res.status(404).send({ error: `Player not found` })
    }
    res.send(foundArtist)
}
// UPDATE
exports.editById = (req, res) => {

}
// DELETE
exports.deleteById = (req, res) => {
    if (artists.delete(req.params.id) === undefined) {
        return res.status(404).send({ error: "Artist not found" })
    }
    res.status(204).send()
}