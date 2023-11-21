const slug = require('slug');
const md5 = require('md5');
const Category = require('../models/Category');
const Product = require('../models/Product');

class CategoryController
{
    async listCategory(req, res) {
        try {
            const categories = await Category.find({});
            res.status(200).json({data: categories, message: 'Success'});

        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async store(req, res) {
        try {
            let time = new Date();
            const request = req.body;
            request.slug = slug(request.name) + '_' + md5(time);
            const category = new Category(request);
            await category.save();
            res.status(200).json({message: "Success"});
            
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async detail(req, res) {
        try {
            const category = await Category.findOne({'slug': req.params.slug}, '_id name');
            const products = await Product.find({'categoryId': category._id}, '_id name slug image price');

            res.status(200).json({category, products});

        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = new CategoryController;