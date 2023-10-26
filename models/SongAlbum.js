module.exports = (dbConnection, Sequelize, Song, Album)=>{
    const SongAlbum = dbConnection.define("SongAlbum",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        track_number:{
            type: Sequelize.INTEGER,
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
        AlbumId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Album,
                key: "id"
            }
        }
    })
    return SongAlbum
}