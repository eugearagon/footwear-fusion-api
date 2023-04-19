const { DataTypes } = require("sequelize");
const moment = require('moment');

module.exports = (sequelize) => {
  const Promotions = sequelize.define("Promotions", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      allowNull: false,
    },
    code: {
      type: DataTypes.INTEGER
    },
    current: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    expiration: {
        type: DataTypes.DATE,
        defaultValue: () => moment().add(15, 'days').format('YYYY-MM-DD HH:mm:ss')
    }
  },{ timestamps: false });

  Promotions.addHook("beforeCreate", async (instance, options) => {
    instance.code = await Math.floor(Math.random() * 900000) + 100000;
  });

  return Promotions;
};