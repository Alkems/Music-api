module.exports = (dbConnection, Sequelize)=>{
    const Artist = dbConnection.define("Artist",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        country:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Artist
}