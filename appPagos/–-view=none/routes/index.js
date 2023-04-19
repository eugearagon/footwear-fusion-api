const express = require('express');
const router = express.Router();

const PaymentController = require ("../Controllers/PaymentsController.js");
const PaymentService = require("../Services/PaymentsService.js");
const PaymentInstance = new PaymentController(new PaymentService());


/* GET home page. */
router.get('/', function(req, res, next) {
 return res.json({
  "/payment": "generar link de pago",
  "/subscription": "generar un link de subscripcion"
 })
});


/*Get a pagos*/ 
router.get('/payment', function(req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});


/*Get a subscripciones*/
router.get('/subscription', function(req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});


module.exports = router;
