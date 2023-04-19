const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Product", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    code:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stock:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    productState:{ //codigo numerico que indica el estado de un producto(0 = faltante, 1=stonck disponible, 2=pedido a proveedor, ect..)
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{ timestamps: false });
};
