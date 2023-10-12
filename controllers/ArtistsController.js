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
    const result = await artists.findAll({ attributes: ["id", "name", "country"] })
    res.json(result)
}

exports.getById = async (req, res) => {
    const foundArtist = await artists.findByPk(req.params.id)
    if (foundArtist === null) {
        return res.status(404).send({ error: 'Artist not found`'})
    }
    res.send(foundArtist)
}

// UPDATE
exports.editById = async (req, res) => {
    const updateArtist = await artists.update({
        name: req.body.name,
        country: req.body.country
    }, {
        where: {id:req.body.id}
    })
    res.status(201)
        .location(`${getBaseurl(req)}/artists/${updateArtist.id}`)
        .json(updatedArtist)
}

// DELETE
exports.deleteById = async (req, res) => {
    const deleteArtist = await artists.destroy({
        where: {id:req.body.id}
    })
    res.status(204)
}