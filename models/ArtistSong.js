module.exports = (dbConnection, Sequelize, Artist, Song)=>{
    const ArtistSong = dbConnection.define("ArtistSong",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role:{
            type: Sequelize.STRING,
            allowNull: false
        },
        songId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Song,
                key: "id"
            }
        },
        artistId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Artist,
                key: "id"
            }
        }
    })
    return ArtistSong
}