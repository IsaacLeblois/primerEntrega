//Packages
const express = require('express')
const mainRouter = require('./src/routes/main')
const cartRouter = require('./src/routes/cart')

//App
const app = express()

//Routes
app.use('/', mainRouter)
app.use('/cart', cartRouter)

//Server configuration
app.listen(8080, () => {
    console.log('Server ONLINE')
})