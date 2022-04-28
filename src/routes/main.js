//Packages
const { Router } = require('express')
const Container = require('../../fileSystem')
const router = new Router()
const database = new Container('products')

//Admin function
let admin = true
function adminPage(req, res, next) {
    if (admin) {
        next()
    } else {
        res.sendStatus(403)
    }
}

//Routes
router.get('/', async (req, res) => {
    try {
        const allProducts = await database.getAll()
        res.json(allProducts)
    } catch(err) {
        console.log(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const productFound = await database.getById(id)

        if(!productFound) {
            res.sendStatus(404)
        } else {
            res.json(productFound)
        }
    } catch(err) {
        console.log(err)
    }
})

router.post('/', adminPage, async (req, res) => {
    try {
        const allProducts = await database.getAll()
        let lastID = 0

        if (allProducts.length) {
            lastID = allProducts[allProducts.length - 1].id
        }

        const newProduct = {
            id: lastID + 1,
            title: req.body.title ? req.body.title : 'No Title',
            price: req.body.price ? req.body.price : 0,
            thumbnail: req.body.thumbnail ? req.body.thumbnail : 'noImage.jpg'
        }

        await database.add(newProduct)
        res.json(newProduct)
    } catch(err) {
        console.log(err)
    }
})

router.put('/:id', adminPage, async (req, res) => {
    try {
        const id = req.params.id
        const productFound = await database.getById(id)

        const editedProduct = {
            id: productFound.id,
            title: req.body.title ? req.body.title : productFound.title,
            price: req.body.price ? req.body.price : productFound.price,
            thumbnail: req.body.thumbnail ? req.body.thumbnail : productFound.thumbnail,
        }

        await database.editById(editedProduct)
        
        res.json(editedProduct)
    } catch(err) {
        console.log(err)
    }
})

router.delete('/:id', adminPage, async (req, res) => {
    try {
        const id = req.params.id
        const response = await database.deleteById(id)

        if(!response) {
            res.sendStatus(404)
        } else {
            res.send('Producto eliminado exitosamente')
        }
    } catch(err) {
        console.log(err)
    }
})

//Export
module.exports = router