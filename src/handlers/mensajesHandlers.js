const { mensajeBienvenida, registroNewsletter, Newsletter } = require("../controllers/mensajesControllers");

const mensajeBienvenidaHandlers = async (req, res) => {
  try {
    const { email, subject, html } = req.body;
    const newMensje = await mensajeBienvenida(email, subject, html);
    if (newMensje) res.status(200).json("Mensajes Enviados");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const registroNewsletterHandlers = async (req, res) => {
    try {
      const { email, subject, html } = req.body;
      const newMensje = await registroNewsletter(email, subject, html);
      if (newMensje) res.status(200).json("Mensajes Enviados");
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };

  const newsletterHandlers = async (req, res) => {
    try {
      const { email, subject, html } = req.body;
      const newMensje = await Newsletter(email, subject, html);
      if (newMensje) res.status(200).json("Mensajes Enviados");
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
  mensajeBienvenidaHandlers,
  registroNewsletterHandlers,
  newsletterHandlers
};
