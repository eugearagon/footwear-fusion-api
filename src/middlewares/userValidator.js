require("dotenv").config();
const jwt = require("jsonwebtoken");
const {LoginUser, Role, UserState} = require("../db");
const { json } = require("body-parser");
const { SECRET } = process.env;

// const rexgDireccion =/^[^,]+(?:[,\s]+[^,]+)+[,\s]*[a-zA-ZáéíóúüñÑ\s]+[,\s]*[a-zA-ZáéíóúüñÑ\s]+[,\s]*cp:\s*\d{4,5}$/i
const rexTelefono = /^\+\d{1,4} \d{10,15}$/
const largoString = /[A-Za-z]{3,}/
const rexgEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(401).json({ message: "no token provided" }); //si el usuario no envia x-access-token, error

    const tokenUser = jwt.verify(token, SECRET); //extraigo lo que esta dentro del token
    
    req.userId = tokenUser.id;

    const user = await LoginUser.findByPk(req.userId); //no preciso la contraseña
    
    if (!user) return res.status(404), json({ message: "user not found" });

    next();

  } catch (error) {
    return res.status(404).json({ message: "unauthorized" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    
    const user = await LoginUser.findByPk(req.userId);
    
    if (!user) return res.status(404).json({ message: "user not found" });
    const UserRol = await Role.findByPk(user.RoleId); // busco el rol del usuario
    if (UserRol.Rol !== "admin") return res.status(401).json({ message: "administrator role required" });   
    next();
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};


//Para el registro de nuevo admin que no falte los datos
const verifyCrearAdmin = async (req, res, next) => {
  const {email, rol} = req.body;
  if(!email) return res.status(400).json({ message:"Falta indicar email"});
  if(email && !rexgEmail.test(email)) return res.status(400).json({message: "Formato de email incorrecto"})
  if(!rol) return res.status(400).json({ message:"Falta indicar rol"});
  if(rol !== "admin" && rol !== "customer") return res.status(400).json({message:`El rol ${rol} no existe `})
  const user = await LoginUser.findOne({where : {email: email}});
  if(user) return res.status(400).json({message: `El ${email} ya esta registrado`})

  next();
  
}

//Para el ingreso de DataUser
const verifyDataUser = async (req, res, next) => {
  const {name, last_name, phone, address} = req.body
  if(!name) return res.status(400).json({message: "Falta indicar nombre"});
  if(name && !largoString.test(name)) return res.status(400).json({message: `El nombre: ${name}, es muy corto`})
  if(!last_name) return res.status(400).json({message: "Falta indicar apellido"});
  if(last_name && !largoString.test(last_name)) return res.status(400).json({message: `El apellido: ${last_name}, es muy corto`})
  if(!phone) return res.status(400).json({message: "Falta indicar teléfono"});
  if(phone && !rexTelefono.test(phone)) return res.status(400).json({message: "Error en formato de telefono, colocar: +54 1155555555"})
  if(!address) return res.status(400).json({message: "Falta indicar dirección"});
  // if(address && !rexgDireccion.test(address)) return res.status(400).json({message: "Error en formato de dirección, colocar: calle numero, localida, provincia, cp: numero"})
  next();
}

const verifyEmail = (req, res, next) => {
  const {email} = req.body;
  if(!email) return res.status(400).json({ message:"Falta indicar email"});
  if(email && !rexgEmail.test(email)) return res.status(400).json({message: "Formato de email incorrecto"})
  next();
}

const isUserBlocked = async (req, res, next) => {
  try {
    
    const user = await LoginUser.findByPk(req.userId);

    if (!user) return res.status(404).json({ message: "user not found" });

    const stateUser = await UserState.findByPk(user.UserStateId); // busco el status del usuario
   
    if (stateUser.state === "Blocked") return res.status(401).json({ message: "Usuario blokeado" });
  
    next();
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};



module.exports = {
    verifyToken,
    isAdmin,
    verifyCrearAdmin,
    verifyDataUser,
    verifyEmail,
    isUserBlocked
}