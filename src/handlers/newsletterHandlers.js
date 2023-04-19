const { createNewsletter, getNewsletter } = require("../controllers/newsletterControllers")

const registroNewsletter = async (req, res) => {
    console.log(req.body);
    try {
        const { email, subject } = req.body;
        // const userMail = await Newsletter.findOne({
        //     where: { email },
        // });
        // if (!userMail) {
            const registro = await createNewsletter(email, subject)
            res.status(201).json(registro);
        // }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getNewsletterHandlers = async (req, res) => {
    try {
        const newsletter = await getNewsletter();
        res.status(201).json(newsletter);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    registroNewsletter,
    getNewsletterHandlers
}