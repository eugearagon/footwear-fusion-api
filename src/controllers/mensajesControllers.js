//importamos transporte para mandar los correos
const { Product, TalleProduct, ColorProduct, CompraProducto, Cart, Promotions, LoginUser, DataUser, OrdenCompra, MarcaProduct } = require("../db");
const { transporter } = require("../config/nodeMailer");
const {detalleDeCompra} = require("../mensajes/detalleCompra");

// const mensajeBienvenida = async (email) => {
//     await transporter.sendMail({
//         from: '"FOOTWEAR FUSION" <pt10henry@gmail.com>',//quien envia el mensaje
//         to: email,//el email al que se va a mandar o varios email ej: to: ["bar@example.com, baz@example.com"].join(", ")
//         subject: "Hola",//el titulo del correo
//         //el cuerpo del correo, puede ser tipo TEXT o HTML
//         html: `<b>Hola ${email}<b/>,
//         <a target="_blank" href="http://localhost:3000" >Bienvenido</a>
//         `,
//     });
// }

const mensajeBienvenida = async (email, subject, html) => {
    if (!Array.isArray(email)) {
      email = [email]; // convertir el correo electrónico a un array si es un string
    }
  
    for (let i = 0; i < email.length; i++) {
      await transporter.sendMail({
        from: '"FOOTWEAR FUSION" <pt10henry@gmail.com>', //quien envia el mensaje
        to: email[i], //el email al que se va a mandar o varios email ej: to: ["bar@example.com, baz@example.com"]
        subject: subject, //el titulo del correo
        //el cuerpo del correo, puede ser tipo TEXT o HTML
        html: html,
      });
    }
  };

  const registroNewsletter = async (email, subject, html) => {
    if (!Array.isArray(email)) {
      email = [email]; // convertir el correo electrónico a un array si es un string
    }
  
    for (let i = 0; i < email.length; i++) {
      await transporter.sendMail({
        from: '"FOOTWEAR FUSION" <pt10henry@gmail.com>', //quien envia el mensaje
        to: email[i], //el email al que se va a mandar o varios email ej: to: ["bar@example.com, baz@example.com"]
        subject: subject, //el titulo del correo
        //el cuerpo del correo, puede ser tipo TEXT o HTML
        html: html,
      });
    }
  };

  const Newsletter = async (email, subject, html) => {
    if (!Array.isArray(email)) {
      email = [email]; // convertir el correo electrónico a un array si es un string
    }
  
    for (let i = 0; i < email.length; i++) {
      await transporter.sendMail({
        from: '"FOOTWEAR FUSION" <pt10henry@gmail.com>', //quien envia el mensaje
        to: email[i], //el email al que se va a mandar o varios email ej: to: ["bar@example.com, baz@example.com"]
        subject: subject, //el titulo del correo
        //el cuerpo del correo, puede ser tipo TEXT o HTML
        html: html,
      });
    }
  };


  const mensajeCompra = async (newOrden, userId) => {
    const userCompra = await LoginUser.findByPk(userId);
    const emailUser = userCompra.email;
    const newOrdenCompraProduct = await await CompraProducto.findAll({
      where: {
          CartId: newOrden.CartId,
      },
      include: [
          {
              model: Product,
              attributes: ["title", "price", "image"],
          },
          {
              model: TalleProduct,
              attributes: ["talle"],
          },
      ],
  });
  const newDetalleDeCompra = detalleDeCompra.replace("TTOOTTAALL", newOrden.total)
                            .replace("DDIIRREECCCCIIOONN", newOrden.address)
                            // .replace("PPRROODDUUCCTTOO", newOrdenCompraProduct.dataValues.Product.dataValues.title)
                            // .replace("CCAANNTTIIDDAADD", newOrdenCompraProduct.dataValues.Product.dataValues.qty)
                            // .replace("TTAALLLLEE", newOrdenCompraProduct.dataValues.TalleProduct.dataValues.talle)
                            // .replace("PPRREECCIIOO", newOrdenCompraProduct.dataValues.Product.dataValues.price)
                            // .replace("PPRREECCIIOO", newOrdenCompraProduct.dataValues.Product.dataValues.image);
  
    await transporter.sendMail({
      from: '"FOOTWEAR FUSION" <pt10henry@gmail.com>', //quien envia el mensaje
      to: emailUser, //el email al que se va a mandar o varios email ej: to: ["bar@example.com, baz@example.com"]
      subject: 'Detalle de tu compra', //el titulo del correo
      //el cuerpo del correo, puede ser tipo TEXT o HTML
      html: newDetalleDeCompra,
    });
  };
  
  
  module.exports = {
    mensajeBienvenida,
    registroNewsletter,
    Newsletter,
    mensajeCompra
  };