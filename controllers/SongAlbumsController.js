const { db } = require("../db")
const songAlbum = db.songAlbum
const { getBaseurl } = require("./helpers")


// id, track_number, songId, albumId

// Create
exports.createNew = async (req, res) => {

    if (!req.body.track_number) {
        return res.status(400).send({ error: "Required parameter 'track_number' is missing" })
    }
    if (!req.body.SongId) {
        return res.status(400).send({ error: "Required parameter 'songId' is missing" })
    }
    if (!req.body.AlbumId) {
        return res.status(400).send({ error: "Required parameter 'albumId' is missing" })
    }

    const createdSongAlbum = await songAlbum.create(req.body,{
        fields:["track_number", "SongId", "AlbumId"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/songAlbums/${createdSongAlbum.id}`)
        .json(createdSongAlbum)
}

// READ
exports.getAll = async (req, res) => {
    const result = await songAlbum.findAll({
        include: [db.songs, db.albums]
    })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundSongAlbum = await songAlbum.findByPk(req.params.id)
    if (foundSongAlbum === null) {
        return res.status(404).send({ error: `SongAlbum not found` })
    }
    res.json(foundSongAlbum)
}

// UPDATE
exports.editById = async (req, res) => {
    console.log("Update: ", req.params, req.body)
    const updateResult = await songAlbum.update({ ...req.body}, {
        where: {id:req.body.id},
        fields: ["track_number", "songId", "albumId"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "SongAlbum not found" })
    }

    res.status(200)
        .location(`${getBaseurl(req)}/SongAlbums/${req.params.id}`)
        .send()
}

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await songAlbum.destroy({
        where: {id: req.params.id } 
    })

    if (deletedAmount === 0) {
        return res.status(404).send({ error: "SongAlbum not found"})
    }
    res.status(204).send()
}