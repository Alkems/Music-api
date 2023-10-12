const { db } = require("../db")
const artists = db.artists;
const { getBaseurl } = require("./helpers")

// Create
exports.createNew = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdArtist = await artists.create(req.body,{
        fields:["name","country"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/artists/${createdArtist.id}`)
        .json(createdArtist)
}
// READ
exports.getAll = async (req, res) => {
    const result = await artists.findAll()
    res.send(JSON.stringify(result))
}
exports.getById = (req, res) => {
    const foundArtist = artists.getById(req.params.id)
    if (foundArtist === undefined) {
        return res.status(404).send({ error: 'Artist not found`'})
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