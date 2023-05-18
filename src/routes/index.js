const router = require('express').Router();
const {faker} = require('@faker-js/faker');
const Product = require('../models/product');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/add', (req, res) => {
    res.render('products/add-products');
});

router.get('/generate-data', async (req, res) => {
    for(let i = 0; i < 99; i++) {
        const product = new Product();
        product.category = faker.commerce.department();
        product.name = faker.commerce.productName();
        product.price = faker.commerce.price();
        product.description = faker.lorem.words(10);
        product.image = faker.image.url();
        try {
            await product.save();
        } catch(err) {
            next(err);
        }
    }
    res.redirect('/add');
});

router.post('/add', async (req, res, next) => {
    const product = new Product();
    product.name =  req.body.product_name;
    product.price = req.body.product_price;
    product.category = req.body.product_category;
    product.description = req.body.product_description;
    product.image = req.body.product_image;
    try {
        await product.save();
    } catch(err) {
        next(err);
        res.redirect('/add');
    }
});

router.get('/products/:page', async (req, res, next) => {
    let perPage = 12;
    let page = req.params.page || 1; // or 0
    try {
        const products = await Product
            .find({})
            .skip((perPage * page) - perPage) // or (perPage * page)
            .limit(perPage);
        const count = await Product.countDocuments();
        res.render('products/products', {
            products,
            current: page,
            pages: Math.ceil(count / perPage)
        });
    } catch(err) {
        next(err);
    }
});

module.exports = router;