const { Sequelize } = require("sequelize");
require("dotenv").config();
const {
  userDataModels,
  userCategoriModels,
  userLoginModels,
  userStateModels,
} = require("./models/Usuarios/index");

const {
  producModels,
  productCategoriModels,
  productColorModels,
  productMarcaModels,
  productTallesModels,
} = require("./models/Productos/index");

const {
    compraCartModels,
    compraProductModels,
    compraOrdenCompraModels,
} = require("./models/Compra/index");


const { reviewsPunctuation } = require("./models/ReviewsPuntajes/index");

const { promocionesModels } = require("./models/Promociones");
const { newsletterModels } = require("./models/Newsletter");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME_BD, DB_DEPLOY } = process.env;

const sequelize = new Sequelize(
  DB_DEPLOY,
  { logging: false }
);
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME_BD}`,
//   { logging: false }
// );

//Ejecuto los modelos:
//User:
  userDataModels(sequelize);
  userCategoriModels(sequelize);
  userLoginModels(sequelize);
  userStateModels(sequelize);
  //Product:
  producModels(sequelize);
  productCategoriModels(sequelize);
  productColorModels(sequelize);
  productMarcaModels(sequelize);
  productTallesModels(sequelize);
  //Reviews
  reviewsPunctuation(sequelize);
  //promociones:
  promocionesModels(sequelize);
  //Newsletter:
  newsletterModels(sequelize);
  //Compras
  compraCartModels(sequelize);
  compraProductModels(sequelize);
  compraOrdenCompraModels(sequelize);
  


//Relaciono los modelos:
const {
  Newsletter,
  CategoriProduct,
  ColorProduct,
  MarcaProduct,
  Product,
  TalleProduct,
  Promotions,
  ReviewsPuntuacion,
  Role,
  DataUser,
  LoginUser,
  UserState,
  Cart,
  CompraProducto,
  OrdenCompra,
} = sequelize.models;

//userdata n --- 1 loginUser
LoginUser.hasMany(DataUser);
DataUser.belongsTo(LoginUser);

//CategoriUser --- N LoginUser
Role.hasMany(LoginUser);
LoginUser.belongsTo(Role);

//UserState --- N LoginUser
UserState.hasMany(LoginUser);
LoginUser.belongsTo(UserState);

//loginUser n --- n product
LoginUser.belongsToMany(Product, { through: "Favourite" });
Product.belongsToMany(LoginUser, { through: "Favourite" });

//CategoriProduct N--- N Product
CategoriProduct.belongsToMany(Product, { through: "Product_CategoriProduct" });
Product.belongsToMany(CategoriProduct, { through: "Product_CategoriProduct" });

//MarcaProduct --- N Product
MarcaProduct.belongsToMany(Product, { through: "Product_MarcaProduct" });
Product.belongsToMany(MarcaProduct, { through: "Product_MarcaProduct" });

//ColorProduct n --- n product
ColorProduct.belongsToMany(Product, { through: "ColorYProduct" });
Product.belongsToMany(ColorProduct, { through: "ColorYProduct" });

//tallesProduct n --- n product
TalleProduct.belongsToMany(Product, { through: "TallesYProducto" });
Product.belongsToMany(TalleProduct, { through: "TallesYProducto" });

//Product --- N ReviewsPuntuacion
Product.hasMany(ReviewsPuntuacion);
ReviewsPuntuacion.belongsTo(Product);

//cart 1 --- 1 loginUser
LoginUser.belongsTo(Cart);
Cart.belongsTo(LoginUser);

//ordenCompra 1 --- 1 cart
Cart.belongsTo(OrdenCompra);
OrdenCompra.belongsTo(Cart);

//Cart 1 --- 1 Promotions
Promotions.belongsTo(Cart);
Cart.belongsTo(Promotions);

//ordenCompra N --- 1 loginUser
LoginUser.hasMany(OrdenCompra);
OrdenCompra.belongsTo(LoginUser);

//cart 1 --- n compraProducto
Cart.hasMany(CompraProducto);
CompraProducto.belongsTo(Cart);

//Product 1 --- n compraProducto
Product.hasMany(CompraProducto);
CompraProducto.belongsTo(Product);

//TalleProduct 1 --- n compraProducto
TalleProduct.hasMany(CompraProducto);
CompraProducto.belongsTo(TalleProduct);

//ColorProduct 1 --- n compraProducto
ColorProduct.hasMany(CompraProducto);
CompraProducto.belongsTo(ColorProduct);

module.exports = { sequelize, ...sequelize.models };
