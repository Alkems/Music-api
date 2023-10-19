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
db.songs = require("./models/Song")(sequelize,Sequelize)
db.artistSongs = require("./models/ArtistSong")(sequelize,Sequelize,db.artists,db.songs)

db.artists.belongsToMany(db.songs, { through: db.artistSongs})
db.songs.belongsToMany(db.artists, { through: db.artistSongs})
db.artists.hasMany(db.artistSongs)
db.songs.hasMany(db.artistSongs)
db.artistSongs.belongsTo(db.artists)
db.artistSongs.belongsTo(db.songs)


sync = async ()=>{
    //await sequelize.sync({force:true}) // Erase all and recreate 
    await sequelize.sync({alter:true}) // Alter existing to match the model
    //await db.songs.findOrCreate({
    //    where: { name: 'Jack Sparrow somg' },
    //    defaults: {
    //      name: 'Jack Sparrow somg',
    //      Artists: {
    //        name: 'Jack Sparrow'
    //      }
    //    }
    //  });
}

module.exports = {
    db, sync
}