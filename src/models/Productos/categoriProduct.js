const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("CategoriProduct", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },{ timestamps: false });
};
