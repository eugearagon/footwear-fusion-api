const { ColorProduct, TalleProduct, MarcaProduct, CategoriProduct } = require("../db");

const getcolor = async () => {
    const colorBase = await ColorProduct.findAll({
        attributes: ['color']
    });
    const arrColores = colorBase.map((dato) => {
        return dato.color
      });
    const colorArr = arrColores.join(",").split(",");

//este para poder sacarle los espacios en blanco a cada string
const quitarEspaciosColor = [];
const coloresRegistrados = {};

colorArr.forEach((tem) => {
  const color = tem.trim().toUpperCase();
  if (color !== '' && !coloresRegistrados[color]) {
    quitarEspaciosColor.push(color);
    coloresRegistrados[color] = true;
  }
});

return quitarEspaciosColor;
}

const getTalles = async () => {
  const tallesBase = await TalleProduct.findAll({
      attributes: ['talle']
  });
  const arrTalles = tallesBase.map((dato) => {
      return dato.talle
    });
  const talleArr = arrTalles.join(",").split(",");

//este para poder sacarle los espacios en blanco a cada string
const quitarEspaciosTalle = [];
const tallesRegistrados = {};

talleArr.forEach((tem) => {
const talle = tem.trim();
if (talle !== '' && !tallesRegistrados[talle]) {
  quitarEspaciosTalle.push(talle);
  tallesRegistrados[talle] = true;
}
});

return quitarEspaciosTalle.sort();
}

const getMarcas = async () => {
  const marcasBase = await MarcaProduct.findAll({
      attributes: ['name']
  });
  const arrMarcas = marcasBase.map((dato) => {
      return dato.name
    });
  const marcaArr = arrMarcas.join(",").split(",");

//este para poder sacarle los espacios en blanco a cada string
const quitarEspaciosMarcas = [];
const marcasRegistrados = {};

marcaArr.forEach((tem) => {
const marca = tem.trim().toUpperCase();
if (marca !== '' && !marcasRegistrados[marca]) {
  quitarEspaciosMarcas.push(marca);
  marcasRegistrados[marca] = true;
}
});

return quitarEspaciosMarcas.sort();
}

const getCategori = async () => {
  const categoryBase = await CategoriProduct.findAll({
      attributes: ['category']
  });
  const arrCategory = categoryBase.map((dato) => {
      return dato.category
    });
  const categoryArr = arrCategory.join(",").split(",");

//este para poder sacarle los espacios en blanco a cada string
const quitarEspaciosCategory = [];
const categoryRegistrados = {};

categoryArr.forEach((tem) => {
const category = tem.trim().toUpperCase();
if (category !== '' && !categoryRegistrados[category]) {
  quitarEspaciosCategory.push(category);
  categoryRegistrados[category] = true;
}
});

return quitarEspaciosCategory.sort();
}

module.exports = {
    getcolor,
    getTalles,
    getMarcas,
    getCategori
}