// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
require("dotenv").config();
const { PROD_ACCESS_TOKEN } = process.env;

mercadopago.configure({
    access_token: PROD_ACCESS_TOKEN,
});

const createPreferenceHandlers = async (req, res) => {
    const datos = req.body.data.item
    const player = req.body.data.player
    const data= req.body.data.promo
  
    const items = datos.map(elem => {
        return {
                id: elem.id,
                code: elem.code,
                title: elem.title,
                image: elem.image,
                unit_price: parseInt(elem.price),
                marca: elem.marca,
                size: elem.talle,
                quantity: parseInt(elem.qty),
                description: elem.description
            }
       
    })
   
    let preference = {
        items: items,
        metadata: data,
        payer: player,
        promo: player.descuento,
        back_urls: {
            "success": "http://localhost:3000/success",
            "failure": "http://localhost:3000/failure",
            "pending": ""
        },
        auto_return: "approved",
        binary_mode: true
    };

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.json({
                global: response.body,
            });
        }).catch(function (error) {
            console.log(error);
        });
};

// Handler para URL de éxito
const handleSuccess = async (req, res) => {
    const { collection_id, payment_id, payment_type, status } = req.query;

    if (status === "approved") {
        const aprobado = {
            collection_id,
            payment_id,
            payment_type,
            status
        }
       
        res.json(aprobado);
    } else {
        // El pago no fue aprobado
       
        res.send("Pago rechazado");
    }
};


const getStatusCompra = async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await mercadopago.payment.get(id);
      
      const response = {
        authorization_code: payment.body.authorization_code,
        card: payment.body.card,
        date_approved: payment.body.date_approved,
        payment_method: payment.body.payment_method_id,
        status: payment.body.status,
        transaction_amount: payment.body.transaction_amount,
        transaction_details: payment.body.transaction_details
      };

      res.json(response);
    } catch (error) {
     
      res.status(500).json({ error: 'Error al obtener el estado del pago' });
    }
  };



module.exports = {
    createPreferenceHandlers,
    getStatusCompra,
    handleSuccess
   
}