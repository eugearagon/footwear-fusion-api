const {
    CategoriProduct, 
    ColorProduct, 
    MarcaProduct, 
    TalleProduct, 
    Product,
    ReviewsPuntuacion
} = require("../db")

const createProduct = async (title,code,price,image,description,stock,productState) => {
    const newProduct = await Product.create({
        title,
        code,
        price,
        image,
        description,
        stock,
        productState
    })

    return newProduct;
}

const createMarcaProduct = async (marca) => {
  return await MarcaProduct.create({
        name: marca
    })
}

const createTalleProduct = async (talle) => {
    return await TalleProduct.create({
        talle: talle
    })
}

const createColorProduct = async (color) => {
    return await ColorProduct.create({
        color: color
    })
}

const createCategoryProduct = async (category) => {
    return await CategoriProduct.create({
        category: category
    })
}

const getProduct = async () => {
    const product = await Product.findAll({
        include:[
            {
                model: MarcaProduct,
                attributes: ['name'],
                through: { attributes: [] },
            },
            {
                model: CategoriProduct,
                attributes: ['category'],
                through: { attributes: [] },
            },
            {
                model: ColorProduct,
                attributes: ['color'],
                through: { attributes: [] },
            },
            {
                model: TalleProduct,
                attributes: ['talle'],
                through: { attributes: [] },
            },
            {
                model: ReviewsPuntuacion,
                attributes: ['punctuation',"review"],
            }
        ]
    })

    return product;
}

const serchProduct = async (name) => {
    const result = await getProduct();
    const buscar = name.toLowerCase().trim();
    const filterProduct = result.filter((product) => {
      return product.title.toLowerCase().includes(buscar);
    });
  
    if(filterProduct.length) return filterProduct 
    throw new Error(`${name} no fue encontrado`);
  };

const ordenProduct = (product) => {
        product.sort(function(a, b) {
        var titleA = a.dataValues.title.toUpperCase(); // convertir a mayúsculas para evitar problemas con mayúsculas/minúsculas
        var titleB = b.dataValues.title.toUpperCase();
      
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
      
        // si los títulos son iguales, no es necesario cambiar el orden
        return 0;
      });
      return product
}

const getProductId = async (pruductId) => {
    const product = await getProduct();
    const productId = product.find(product => product.id === pruductId);
    if(productId) return productId;
    throw new Error(`${pruductId} no encontrado`);
}

const updateProduct = async (pruductId, productData) => {
    const {
      title,
      code,
      price,
      image,
      description,
      stock,
      productState,
      marca,
      talle,
      color,
      category,
    } = productData;
  
    const product = await Product.findByPk(pruductId);
    if (!product) throw new Error("Product not found");
  
    await product.update({
      title,
      code,
      price,
      image,
      description,
      stock,
      productState,
    });
    
    if (marca) {
      const marcaInstance = await MarcaProduct.findOne({ where: { name: marca } });
      if (marcaInstance) {
        await product.setMarcaProducts([marcaInstance.id]);
      } else {
        const newMarca = await MarcaProduct.create({ name: marca });
        await product.setMarcaProducts([newMarca.id]);
      }
    }
  
    if (talle) {
      const talleInstance = await TalleProduct.findOne({ where: { talle } });
      if (talleInstance) {
        await product.setTalleProducts([talleInstance.id]);
      } else {
        const newTalle = await TalleProduct.create({ talle });
        await product.setTalleProducts([newTalle.id]);
      }
    }
  
    if (color) {
      const colorInstance = await ColorProduct.findOne({ where: { color } });
      if (colorInstance) {
        await product.setColorProducts([colorInstance.id]);
      } else {
        const newColor = await ColorProduct.create({ color });
        await product.setColorProducts([newColor.id]);
      }
    }
  
    if (category) {
      const categoryInstance = await CategoriProduct.findOne({ where: { category } });
      if (categoryInstance) {
        await product.setCategoriProducts([categoryInstance.id]);
      } else {
        const newCategory = await CategoriProduct.create({ category });
        await product.setCategoriProducts([newCategory.id]);
      }
    }
  
    return product;
  };

const getProductPunctuation = async () => {
  const productos = await Product.findAll({
    include: [
      {
        model: ReviewsPuntuacion,
        attributes: ['punctuation', "review"]
      }
    ]
  });

  // Itera sobre cada producto para calcular la puntuación promedio
  for (const producto of productos) {
    let puntuacionTotal = 0;
    let cantidadPuntuaciones = 0;

    for (const review of producto.ReviewsPuntuacions) {
      const puntuacion = parseInt(review.punctuation);
      if (!isNaN(puntuacion)) {
        puntuacionTotal += puntuacion;
        cantidadPuntuaciones ++
      }
    }
    const max = 5
    let puntos;

    const puntuacionPromedio = cantidadPuntuaciones > 0 ? puntuacionTotal  : 0;
    puntuacionPromedio > 5 ? puntos = max : puntos = puntuacionPromedio
    producto.setDataValue('promedio', parseFloat(puntos.toFixed(1)));
  }

  // Ordena los productos por puntuación promedio de mayor a menor
  productos.sort((a, b) => b.promedio - a.promedio);

  // Devuelve los 5 primeros productos con la puntuación promedio más alta
  return productos.slice(0, 5);
}



module.exports = {
    createProduct,
    createMarcaProduct,
    createTalleProduct,
    createColorProduct,
    createCategoryProduct,
    getProduct,
    serchProduct,
    ordenProduct,
    getProductId,
    updateProduct,
    getProductPunctuation
}