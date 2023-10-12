module.exports = (dbConnection, Sequelize)=>{
    const Album = dbConnection.define("Album",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Album
}