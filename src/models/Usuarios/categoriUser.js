const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Role", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,

    },
    Rol: {
      type: DataTypes.STRING,
      values: ["admin", "customer"],
      allowNull: false,
      defaultValue: 'customer',
    },

  },{ timestamps: false });
};
