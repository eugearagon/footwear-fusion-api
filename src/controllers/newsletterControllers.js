const { Newsletter, Promotions } = require("../db");
const { mensajeNewsletterPromo } = require("../mensajes/mensajeNewsletterPromo");
const { transporter } = require("../config/nodeMailer");

// const createNewsletter = async (email) => {
//     const newEmail = await Newsletter.findOne({
//         where: {email},
//     })
//     !newEmail ? newEmail = await Newsletter.create(email) : throw newError(`${email} ya está registrado en nuestro Newsletter`)
// }

const createNewsletter = async (email, subject) => {
    console.log(subject);
    const newEmail = await Newsletter.findOne({
        where: { email },
    });
    if (!newEmail) {
        await Newsletter.create({ email });
        const promo = await Promotions.create();
        if (!Array.isArray(email)) {
            email = [email]; // convertir el correo electrónico a un array si es un string
        }
        const newHtml = mensajeNewsletterPromo.replace("CCOODDEE", promo.code).replace("DDIISSCCOOUUNNTT", promo.discount).replace("FFEECCHHAA", promo.expiration);
        for (let i = 0; i < email.length; i++) {
            console.log(email, subject, newHtml);
            await transporter.sendMail({
                from: '"FOOTWEAR FUSION" <pt10henry@gmail.com>', //quien envia el mensaje
                to: email[i], //el email al que se va a mandar o varios email ej: to: ["bar@example.com, baz@example.com"]
                subject: subject, //el titulo del correo
                //el cuerpo del correo, puede ser tipo TEXT o HTML
                html: newHtml,
            }) 
        }; 
        console.log('aca estamos');
    } else {
        throw new Error(`${email} ya está registrado en nuestro Newsletter`);
    }
}

const getNewsletter = async () => {
    const newsletter = await Newsletter.findAll({
        attributes: ['email']
    });
    const arrNewsletter = newsletter.map((dato) => {
        return dato.email
    });
    return arrNewsletter
}


module.exports = {
    createNewsletter,
    getNewsletter
}