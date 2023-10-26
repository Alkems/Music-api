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
db.artistSongs = require("./models/ArtistSong")(sequelize,Sequelize,db.artists,db.songs)

db.artists.belongsToMany(db.songs, { through: db.artistSongs})
db.songs.belongsToMany(db.artists, { through: db.artistSongs})
db.artists.hasMany(db.artistSongs)
db.songs.hasMany(db.artistSongs)
db.artistSongs.belongsTo(db.artists)
db.artistSongs.belongsTo(db.songs)

db.songs.belongsTo(db.genres)
db.genres.hasMany(db.songs)



sync = async ()=>{
    if (process.env.DROP_DB) {
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
        console.log("artist created: ", createdA)

        const [genre, createdG] = await db.genres.findOrCreate({
            where: {
                name: "Rock"
            },
            defaults: {
                name: "Rock"
            }
        })

        console.log("genre created: ", createdG)

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

        console.log("song created: ", createdS)

        const [artistSong, createdAS] = await db.artistSongs.findOrCreate({
            where: {
                SongId: song.id,
                ArtistId: artist.id
            },
            defaults: {
                SongId: song.id,
                ArtistId: artist.id,
                role: "Drums"
            }
        })

        console.log("artistSong created: ", createdAS)

    }
    else {
        await db.connection.sync({ alter: true }) // Alter existing to match the model
    }
}

module.exports = {
    db, sync
}