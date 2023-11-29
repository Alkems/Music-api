const { db } = require("../db")
const songs = db.songs;
const { getBaseurl } = require("./helpers")

// Create
exports.createNew = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    if (!req.body.GenreId) {
        return res.status(400).send({ error: "Required parameter 'GenreId' is missing" })
    }
    if (!req.body.date_published) {
        return res.status(400).send({ error: "Required parameter 'date_published' is missing" })
    }


    const createdSong = await songs.create(req.body,{
        fields:["name", "GenreId", "date_published"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/songs/${createdSong.id}`)
        .json(createdSong)
}

// READ
exports.getAll = async (req, res) => {
    const result = await songs.findAll({ 
        include: [db.genres]
    })
    res.json(result)
}

exports.getById = async (req, res) => {
    const foundSong = await songs.findByPk(req.params.id,{
        include: [db.genres]
    })
    if (foundSong === null) {
        return res.status(404).send({ error: 'Song not found`'})
    }
    res.send(foundSong)
}

// UPDATE
exports.editById = async (req, res) => {
    console.log("Update: ", req.params, req.body)
    const updateResult = await songs.update({ ...req.body}, {
        where: {id:req.body.id},
        fields: ["name","GenreId","date_published"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Song not found" })
    }

    res.status(200)
        .location(`${getBaseurl(req)}/songs/${req.params.id}`)
        .send()
}

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await songs.destroy({
        where: {id: req.params.id } 
    })

    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Song not found"})
    }

    res.status(204).send()
}