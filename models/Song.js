module.exports = (dbConnection, Sequelize)=>{
    const Song = dbConnection.define("Song",{
        id:{
            type: Sequelize.INT,
            primaryKey: true,
            autoIncrement: true
        },
        genre_id:{
            type: Sequelize.INT,
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