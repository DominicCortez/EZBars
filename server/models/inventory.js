module.exports = (sequelize, DataTypes) =>{
    const inventory = sequelize.define("inventory",{
        itemcategory:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        itemname:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        itemdescription:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        itemnumber:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        itemquantity:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        itemprice:{
            type: DataTypes.STRING,
            allowNull:false,
        },
    })
    return inventory
};