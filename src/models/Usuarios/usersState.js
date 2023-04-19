const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("UserState", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    state: {
      type: DataTypes.ENUM,
      values: ["New", "Active", "Inactive", "Blocked"],
      defaultValue: "New",
      allowNull: false,
    },
  }, { timestamps: false });
};
