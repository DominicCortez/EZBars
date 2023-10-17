module.exports = (sequelize, DataTypes) =>{
    const sales = sequelize.define("sales",{
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
    return sales
};