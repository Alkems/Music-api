module.exports = (dbConnection, Sequelize, Genre)=>{
    const Song = dbConnection.define("Song",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        GenreId:{
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: Genre,
                key: "id"
            }
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        date_published:{
            type: Sequelize.DATE,
            allowNull: false
        }
    })
    return Song
}