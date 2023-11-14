const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    define: {
        timestamps: true
    },
    logging: console.log
});

try {
    sequelize.authenticate().then(()=>{
        console.log('Connection has been established successfully.');
    })
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {}
db.Sequelize = Sequelize
db.connection = sequelize
db.artists = require("./models/Artist")(sequelize,Sequelize)
db.genres = require("./models/Genre")(sequelize,Sequelize)
db.songs = require("./models/Song")(sequelize,Sequelize, db.genres)
db.artistSong = require("./models/ArtistSong")(sequelize,Sequelize,db.artists,db.songs)
db.albums = require("./models/Album")(sequelize,Sequelize)
db.songAlbum = require("./models/SongAlbum")(sequelize,Sequelize,db.songs,db.albums)

db.artists.belongsToMany(db.songs, { through: db.artistSong})
db.songs.belongsToMany(db.artists, { through: db.artistSong})
db.artists.hasMany(db.artistSong)
db.songs.hasMany(db.artistSong)
db.artistSong.belongsTo(db.artists)
db.artistSong.belongsTo(db.songs)

db.songs.belongsTo(db.genres)
db.genres.hasMany(db.songs)

db.songs.belongsToMany(db.albums, { through: db.songAlbum})
db.albums.belongsToMany(db.songs, { through: db.songAlbum})
db.songs.hasMany(db.songAlbum)
db.albums.hasMany(db.songAlbum)
db.songAlbum.belongsTo(db.songs)
db.songAlbum.belongsTo(db.albums)


sync = async ()=>{
    if (process.env.DROP_DB === "true") {
        console.log("Begin DROP")
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 0')
        console.log("Checks disabled")
        await db.connection.sync({ force: true })
        console.log('Database synchronised.');
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 1')
        console.log("Checks enabled")

        const [artist, createdA] = await db.artists.findOrCreate({
            where: {
                name: "Dave Grohl"
            },
            defaults: {
                name: "Dave Grohl",
                country: "USA",
            }
        })

        const [genre, createdG] = await db.genres.findOrCreate({
            where: {
                name: "Rock"
            },
            defaults: {
                name: "Rock"
            }
        })

        const [song, createdS] = await db.songs.findOrCreate({
            where: {
                name: "Everlong"
            },
            defaults: {
                name: "Everlong",
                date_published: new Date(),
                GenreId: genre.id
            }
        })

        const [song2, createdS2] = await db.songs.findOrCreate({
            where: {
                name: "The Pretender"
            },
            defaults: {
                name: "The Pretender",
                date_published: new Date(),
                GenreId: genre.id
            }
        })

        const [artistSong, createdAS] = await db.artistSong.findOrCreate({
            where: {
                SongId: song.id,
                ArtistId: artist.id
            },
            defaults: {
                SongId: song.id,
                ArtistId: artist.id,
                role: "Singer"
            }
        })

        const [artistSong2, createdAS2] = await db.artistSong.findOrCreate({
            where: {
                SongId: song2.id,
                ArtistId: artist.id
            },
            defaults: {
                SongId: song2.id,
                ArtistId: artist.id,
                role: "Singer"
            }
        })

        const [album, createdAl] = await db.albums.findOrCreate({
            where: {
                name: "Echoes, Silence, Patience & Grace"
            },
            defaults: {
                name: "Echoes, Silence, Patience & Grace",
                date_published: new Date(),
            }
        })


        const [songAlbum, createdSA] = await db.songAlbum.findOrCreate({
            where: {
                SongId: song.id,
                AlbumId: album.id
            },
            defaults: {
                SongId: song.id,
                AlbumId: album.id,
                track_number: 1
            }
        })

        const [songAlbum2, createdSA2] = await db.songAlbum.findOrCreate({
            where: {
                SongId: song2.id,
                AlbumId: album.id
            },
            defaults: {
                SongId: song2.id,
                AlbumId: album.id,
                track_number: 2
            }
        })

    }
    else {
        await db.connection.sync({ alter: true }) // Alter existing to match the model
    }
}

module.exports = {
    db, sync
}