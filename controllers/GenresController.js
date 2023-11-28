const { db } = require("../db")
const genres = db.genres;
const { getBaseurl } = require("./helpers")


// id, name

// Create
exports.createNew = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdGenre = await genres.create(req.body,{
        fields:["name"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/genres/${createdGenre.id}`)
        .json(createdGenre)
}
// READ
exports.getAll = async (req, res) => {
    const result = await genres.findAll({ attributes: ["id", "name"] })
    res.json(result)
}

exports.getById = async (req, res) => {
    const foundGenre = await genres.findByPk(req.params.id)
    if (foundGenre === null) {
        return res.status(404).send({ error: 'Genre not found`'})
    }
    res.send(foundGenre)
}

// UPDATE
exports.editById = async (req, res) => {
    console.log("Update: ", req.params, req.body)
    const updateResult = await genres.update({ ...req.body}, {
        where: {id:req.body.id},
        fields: ["name"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Genre not found" })
    }

    res.status(200)
        .location(`${getBaseurl(req)}/genres/${req.params.id}`)
        .send()
}

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await genres.destroy({
        where: {id: req.params.id } 
    })

    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Genre not found"})
    }
    res.status(204).send()
}