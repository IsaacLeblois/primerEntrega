//Packages
const express = require('express')
const mainRouter = require('./src/routes/main')
const cartRouter = require('./src/routes/cart')

//App
const app = express()

//Routes
app.use('/', mainRouter)
app.use('/cart', cartRouter)
app.all('*', (req, res) => {
    res.status(404).json({
      error: -2,
      description: `Ruta '${req.originalUrl}' Metodo '${req.method}' no implementado.`,
    })
})

//Server configuration
app.listen(8080, () => {
    console.log('Server ONLINE')
})