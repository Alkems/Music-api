module.exports = (dbConnection, Sequelize)=>{
    const Genre = dbConnection.define("Genre",{
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
    return Genre
}