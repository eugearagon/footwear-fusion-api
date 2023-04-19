const { Role, DataUser, LoginUser, UserState } = require("../db");

const dataUserCreate = async (name, last_name, phone, address, id) => {
  const userLogiado = await LoginUser.findOne({
    where: { id: id },
  });

  const newDataUser = await DataUser.create({
    name,
    last_name,
    phone,
    address,
  });

  await newDataUser.setLoginUser(userLogiado);
  // await userLogiado.setDataUser(newDataUser)

  //Busco el usuario para devolver con el model Data y ver si se carga bien
  const userLogin = await LoginUser.findOne({
    where: { id: userLogiado.id },
    include: [
      {
        model: DataUser,
        attributes: ["name", "last_name", "phone", "address"],
      },
    ],
  });

  return userLogin;
};

const getAllUsers = async () => {
  let allUsers = await LoginUser.findAll({
    attributes: ["email", "id"],
    include: [
      {
        model: DataUser,
        attributes: ["id", "name", "last_name", "phone", "address"],
      },
      {
        model: UserState,
        attributes: ["state"],
      },
      {
        model: Role,
        attributes: ["Rol"],
      },
    ],
  });
  const user = allUsers.map((use) => {
    return (datos = {
      id: use.id,
      email: use.email,
      DataUsers: use.DataUsers,
      state: use.UserState.state,
      rol: use.Role.Rol,
    });
  });
  return user;
};

const getInfoUser = async (name) => {
    const users = await getAllUsers();
    const buscar = name.toLowerCase().trim();
    const userEmail = users.filter((user) => {
        return user.email.toLowerCase().includes(buscar);
      });
    if(userEmail.length) return userEmail[0];

  const dataName = users.filter((user) => {
    if (user.DataUsers) {
      return (
        user.DataUsers.filter((dato) => {
          return dato.name.toLowerCase().includes(buscar);
        }).length > 0
      );
    }
  });
  if (dataName.length) return dataName;

  const dataLast_name = users.filter((user) => {
    if (user.DataUsers) {
      return (
        user.DataUsers.filter((dato) => {
          return dato.last_name.toLowerCase().includes(buscar);
        }).length > 0
      );
    }
  });
  if (dataLast_name.length) return dataLast_name;

  const dataAddress = users.filter((user) => {
    if (user.DataUsers) {
      return (
        user.DataUsers.filter((dato) => {
          return dato.address.toLowerCase().includes(buscar);
        }).length > 0
      );
    }
  });
  if (dataAddress.length) return dataAddress;

  const state = users.filter((user) => {
    return user.state.toLowerCase().includes(buscar);
  });
  if (state.length) return state;

  const categoriUser = users.filter((user) => {
    return user.rol.toLowerCase().includes(buscar);
  });
  if (categoriUser.length) return categoriUser;

  throw new Error(
    `No se encontraron usuarios que coincidan con este dato: ${name}`
  );
};

const updateUserRole = async (userId, role) => {
  const user = await LoginUser.findByPk(userId); //busco el usuario por id
  const userRole = await Role.findOne({ where: { Rol: role } });
  if (userRole) {
    user.setRole(userRole.id); //cambio el rol que ya tiene por otro
    return user; //usuario actualizado con nuevo rol
  } else {
    throw new Error("rol not found");
  }
};

const updateUserState = async (userId, state) => {
  console.log(userId, state);
  const user = await LoginUser.findByPk(userId); //busco el usuario por id
  console.log(user);
  const userState = await UserState.findOne({ where: { state: state } });
  if(!userState){
    if(state === "Blocked" || state === "Inactive" || state === "Active"){
     const stateUser = await UserState.create({ state: state });
     user.setUserState(stateUser.id); //cambio el state que ya tiene por otro
    }throw new Error("sate no permitido");
  } 
  if (userState) {
    user.setUserState(userState.id); //cambio el state que ya tiene por otro
  } else {
    throw new Error("sate not found");
  }
  
  return user; //usuario actualizado con nuevo rol
};

const updateUserAddress = async (userId, address) => {
  const datos = await DataUser.findOne({ where: { LoginUserId: userId } });  //busco los datos relacionados con el usuario 
  if (datos) {
    await datos.update({ address }); //actualizo la dirección en la tabla DataUser
    return datos; //usuario actualizado
  } else {
    throw new Error("Datos no encontrados");
  }
};

const updateUserPhone = async (userId, phone) => {
  const datos = await DataUser.findOne({ where: { LoginUserId: userId } });  //busco los datos relacionados con el usuario 
  if (datos) {
    await datos.update({ phone }); //actualizo la dirección en la tabla DataUser
    return datos; //usuario actualizado
  } else {
    throw new Error("Datos no encontrados");
  }
};



const getDataUserController = async (userId) =>{
  console.log(userId);
  const dataUser = await DataUser.findOne({
    where: { LoginUserId: userId },
    attributes: ["id", "name", "last_name", "phone", "address"],
  })
  return dataUser
}


module.exports = {
  dataUserCreate,
  getInfoUser,
  getAllUsers,
  updateUserRole,
  updateUserState,
  getDataUserController,
  updateUserAddress,
  updateUserPhone

};

