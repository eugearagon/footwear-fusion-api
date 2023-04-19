const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("TalleProduct", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    talle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },{ timestamps: false });
};
