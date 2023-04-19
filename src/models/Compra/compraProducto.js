const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("CompraProducto", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        qty: {
            type: DataTypes.STRING,
            allowNull: false,
        // },
        // description: {
        //     type: DataTypes.STRING(1234),
        //     allowNull: true,
        }
    },{ timestamps: false });
};