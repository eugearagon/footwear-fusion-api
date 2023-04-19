const { getPreciosUnicos } = require("../controllers/preciosControllers")

const getPreciosHandler = async (req, res) => {
    try {
      const uniquePricesSorted = await getPreciosUnicos();
      res.json(uniquePricesSorted);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };
  
  module.exports = {getPreciosHandler};
