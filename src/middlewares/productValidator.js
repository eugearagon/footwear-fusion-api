
const validateProduct = (req, res, next) => {
  const { category, color, marca, talle } = req.body;

  if (!category || !marca || !talle) {
    return res.status(400).json({ msg: "mandatory fields missing" }); //'faltan campos obligatorios'
  }
  next();
};


//validacion de datos para la actualizacion de un producto:

const validateUpdateProduct = (req, res, next) => {
  const { categoria, color, marca, talle } = req.body;

  if (categoria === "" || marca === "" || talle === "") {
    return res.status(400).json({ msg: "empty fields cannot be updated" }); //'No se pueden actualizar campos vacios'
  }
  next();
};

//middleware de validacion de datos para la eliminacion de un producto:

const validateDeleteProduct = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: "missing product id" }); //"falta el id del producto"
  }
  next();
};

//middleware de validacion de datos para la busqueda de productos:

const validateSearchProducts = (req, res, next) => {
  // valido que se haya enviado al menos un parametro de busqueda
  const { categoria, color, marca, talle } = req.query;

  if (!categoria && !color && !marca && !talle) {
    return res
      .status(400)
      .json({ msg: "must send at least one search parameter" }); //'debe enviar al menos un parametro de busqueda'
  }

  next();
};


module.exports = {
  validateProduct,
  validateUpdateProduct,
  validateDeleteProduct,
  validateSearchProducts
}
