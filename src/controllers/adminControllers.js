const { LoginUser, Role, UserState } = require("../db");
const { getProduct } = require("./productControllers");
const { registreUser } = require("./registroLoginControllers");


const crearUserAdmin = async (email, rol) => {
  const user = await LoginUser.findOne({
    where: { email: email.trim().toLowerCase() },
  });

  if (user) throw new Error("El usuario ya existe" );

  if (rol !== "admin" && rol !== "customer")
    throw new Error(`El ${rol} no existe` );

  const newUser = await registreUser(email, rol.trim());

  return newUser;
};

const adminProductId = async (pruductId) => {
  const product = await getProduct();
  const productId = product.find(product => product.id === pruductId);
  if(productId) return productId;
  throw new Error(`${pruductId} no encontrado`);
}

module.exports = {
  crearUserAdmin,
  adminProductId
};
