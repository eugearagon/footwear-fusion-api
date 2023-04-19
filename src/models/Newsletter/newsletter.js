const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Newsletter", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
    },
  },{ timestamps: false });
};