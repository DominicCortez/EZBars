module.exports = (sequelize, DataTypes) =>{
    const ProductsPrice = sequelize.define("products",{
        itemsupplier:{
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
        itemprice:{
            type: DataTypes.STRING,
            allowNull:false,
        },
    })
    return ProductsPrice
};