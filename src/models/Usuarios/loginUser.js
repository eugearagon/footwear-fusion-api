const { DataTypes } = require("sequelize");
const bcryptjs = require('bcryptjs');

module.exports = (sequelize) => {
  const LoginUser = sequelize.define("LoginUser", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, { timestamps: false });

  // // Método para cifrar la contraseña
  // LoginUser.beforeCreate(async (user) => {
  //   const salt = await bcryptjs.genSalt(10);
  //   user.password = await bcryptjs.hash(user.password, salt);
  // });

  // // Método para comparar la contraseña ingresada con la almacenada en la base de datos
  // LoginUser.prototype.comparePassword = async function (password, receivedPassword) {
  //   return await bcryptjs.compare(password, receivedPassword);
  // };

  // return LoginUser;
};

