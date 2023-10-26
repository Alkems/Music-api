const { db } = require("../db")
const artistSongs = db.artistSong
const { getBaseurl } = require("./helpers")


// id, role, songId, artistId

// Create
exports.createNew = async (req, res) => {

    if (!req.body.role) {
        return res.status(400).send({ error: "Required parameter 'role' is missing" })
    }
    if (!req.body.SongId) {
        return res.status(400).send({ error: "Required parameter 'SongId' is missing" })
    }
    if (!req.body.ArtistId) {
        return res.status(400).send({ error: "Required parameter 'ArtistId' is missing" })
    }

    const createdArtistSong = await artistSongs.create(req.body,{
        fields:["role", "SongId", "ArtistId"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/artistsongs/${createdArtistSong.id}`)
        .json(createdArtistSong)
}
// READ
exports.getAll = async (req, res) => {
    const result = await artistSongs.findAll({
        include: [db.songs, db.artists]
    })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundArtistSong = await artistSongs.findByPk(req.params.id)
    if (foundArtistSong === null) {
        return res.status(404).send({ error: `ArtistSong not found` })
    }
    res.json(foundArtistSong)
}

// UPDATE
exports.editById = async (req, res) => {
    console.log("Update: ", req.params, req.body)
    const updateResult = await artistSongs.update({ ...req.body}, {
        where: {id:req.body.id},
        fields: ["role", "SongId", "ArtistId"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "ArtistSong not found" })
    }

    res.status(200)
        .location(`${getBaseurl(req)}/artistsongs/${req.params.id}`)
        .send
}

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await artistSongs.destroy({
        where: {id: req.params.id } 
    })

    if (deletedAmount === 0) {
        return res.status(404).send({ error: "ArtistSong not found"})
    }
    res.status(204).send()
}