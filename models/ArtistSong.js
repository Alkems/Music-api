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
        SongId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Song,
                key: "id"
            }
        },
        ArtistId: {
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