const { db } = require("../db")
const albums = db.albums;
const { getBaseurl } = require("./helpers")


// id, name

// Create
exports.createNew = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdAlbum = await albums.create(req.body,{
        fields:["name"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/albums/${createdAlbum.id}`)
        .json(createdAlbum)
}
// READ
exports.getAll = async (req, res) => {
    const result = await albums.findAll({ attributes: ["id", "name"] })
    res.json(result)
}

exports.getById = async (req, res) => {
    const foundAlbum = await albums.findByPk(req.params.id)
    if (foundAlbum === null) {
        return res.status(404).send({ error: 'Album not found`'})
    }
    res.send(foundAlbum)
}

// UPDATE
exports.editById = async (req, res) => {
    console.log("Update: ", req.params, req.body)
    const updateResult = await albums.update({ ...req.body}, {
        where: {id:req.body.id},
        fields: ["name"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Album not found" })
    }

    res.status(200)
        .location(`${getBaseurl(req)}/Albums/${req.params.id}`)
        .send
}

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await albums.destroy({
        where: {id: req.params.id } 
    })

    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Album not found"})
    }
    res.status(204).send()
}