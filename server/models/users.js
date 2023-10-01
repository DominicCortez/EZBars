module.exports = (sequelize, DataTypes) =>{
    const users = sequelize.define("users",{
        useremail:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        userpassword:{
            type: DataTypes.STRING,
            allowNull:false,
        },
    })
    return users
}