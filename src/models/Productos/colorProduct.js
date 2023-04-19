const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ColorProduct", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },{ timestamps: false });
};
