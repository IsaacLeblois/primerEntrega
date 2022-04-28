//Packages
const { Router } = require('express')
const router = new Router()
const Container = require('../../fileSystem')
const cartsDB = new Container('cart')
const productsDB = new Container('products')

//Routes
router.post('/', async (req, res) => {
    try {
        const allCarts = await cartsDB.getAll()
        let lastID = 0

        if (allCarts.length) {
            lastID = allCarts[allCarts.length - 1].id
        }

        const newCart = {
            id: lastID + 1,
            timestamp: Date.now(),
            productos: [],
        }

        await cartsDB.add(newCart)
        res.json(newCart)
    } catch(err) {
        console.log(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const response = await cartsDB.deleteById(id)
        
        if(!response) {
            res.sendStatus(404)
        } else {
            res.send('Carrito eliminado exitosamente')
        }
    } catch(err) {
        console.log(err)
    }
})

router.get('/:id/productos', async (req, res) => {
    try {
        const id = req.params.id
        const cartFound = await cartsDB.getById(id)

        if(!cartFound) {
            res.sendStatus(404)
        } else {
            res.json(cartFound)
        }
    } catch(err) {
        console.log(err)
    }
})

router.post('/:id/productos', async (req, res) => {
    try {
        const cartID = req.params.id
        const productID = req.body.id

        const productToAdd = await productsDB.getById(productID)
        const cartToAdd = await cartsDB.getById(cartID)

        let newArr = [...cartsDB]
        newArr = cartsDB.cartToAdd.add(productToAdd)
        await fs.promises.writeFile(`../database/cart.json`, JSON.stringify([newArr]), 'utf-8')  
    } catch(err) {
        console.log(err)
    }
})

router.delete('/:cartId/productos/:productId'), async (req, res) => {
    try {
        const cartID = req.params.cartID
        const productID = req.params.productID

        const productToDel = await productsDB.getById(productID)
        const cartToDel = await cartsDB.getById(cartID)

        let newArr = [...cartsDB]
        newArr = cartsDB.cartToDel.deleteById(productToDel)
        await fs.promises.writeFile(`../database/cart.json`, JSON.stringify([newArr]), 'utf-8')
    } catch(err) {
        console.log(err)
    }
}

//Export
module.exports = router