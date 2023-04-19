const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ReviewsPuntuacion", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    punctuation: {
      type: DataTypes.ENUM('1','2','3','4','5'),
    },
    review: {
      type: DataTypes.STRING,
    },
  },{ timestamps: false });
};
