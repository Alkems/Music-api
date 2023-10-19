const { db } = require("../db")
const artistSongs = db.artistSongs
const { getBaseurl } = require("./helpers")

// Create
exports.createNew = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdArtist = await artistSongs.create(req.body,{
        fields:["name","country"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/artists/${createdArtist.id}`)
        .json(createdArtist)
}
// READ
exports.getAll = async (req, res) => {
    const result = await artistSongs.findAll({
        include: [db.songs, db.artists]
    })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundArtist = await artistSongs.findByPk(req.params.id)
    if (foundArtist === null) {
        return res.status(404).send({ error: `Artist not found` })
    }
    res.json(foundArtist)
}

// UPDATE
exports.editById = async (req, res) => {
    console.log("Update: ", req.params, req.body)
    const updateResult = await artistSongs.update({ ...req.body}, {
        where: {id:req.body.id},
        fields: ["name","country"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Artist not found" })
    }

    res.status(200)
        .location(`${getBaseurl(req)}/artists/${req.params.id}`)
        .send
}

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await artistSongs.destroy({
        where: {id: req.params.id } 
    })

    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Artist not found"})
    }
    res.status(204).send()
}