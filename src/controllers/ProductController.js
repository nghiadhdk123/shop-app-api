const slug = require('slug');
const md5 = require('md5');
const Product = require('../models/Product');

class ProductController
{
    async getListProduct(req, res) {
        try {

            const products = await Product.find().populate({ path: 'categoryId', select: ['name'] });
            res.status(200).json({data: products, message: "Success"});

        } catch (error) {
            res.status(500).json({err: error.message});
        }
    }

    async store(req, res) {
        try {
            let time = new Date();
            const product = new Product({
                name: req.body.name,
                categoryId: req.body.category ? req.body.category : null,
                slug: slug(req.body.name) + '_' + md5(time),
                price: req.body.price,
                image: req.file ? req.file.filename : null,
            });
            await product.save();
            res.json({request: "Success"});

        } catch (error) {
            res.status(500).json({err: error.message});
        }
    }

    async detail(req, res) {
        try {
            const product = await Product.findOne({'slug': req.params.slug}).populate({ path: 'categoryId', select: ['name'] })
            res.status(200).json({data: product, message: "Success"});
        } catch (error) {
            res.status(500).json({err: error.message});
        }
    }
}

module.exports = new ProductController