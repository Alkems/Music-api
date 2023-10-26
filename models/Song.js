module.exports = (dbConnection, Sequelize)=>{
    const Song = dbConnection.define("Song",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        genre_id:{
            type: Sequelize.INTEGER,
            //add references to genre model when genre is added
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