const detalleDeCompra = 
`<html>
<head>
  <meta charset="utf-8">
  <title>Detalle de compra</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Roboto', sans-serif;
    }
    
    table {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      border-collapse: collapse;
    }
    
    td {
      text-align: center;
      padding: 0;
    }
    
    h3 {
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 24px;
    }
    
    p {
      margin: 0;
      font-size: 16px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <table>
    <tr>
      <td>
        <img src="http://eugenioaragon.com.ar/footwear/logo.png" alt="Logo de la empresa" >
        <h3>¡Compra exitosa!</h3>
        <h4>Detalle de tu compra:</h4>
        <p>TOTAL COMPRA: TTOOTTAALL</p>
        <p>DIRECCIÓN DE ENVÍO: DDIIRREECCCCIIOONN</p>
      </td>
    </tr>
    <tr>
      <td>
        <img width="250" src="http://eugenioaragon.com.ar/footwear/gente.jpg" alt="Personas felices usando nuestros productos" >
      </td>
    </tr>
  </table>
</body>
</html>`

;

module.exports = {
    detalleDeCompra
}