const slug = require('slug');
const md5 = require('md5');
const Category = require('../modules/Category');

class CategoryController
{
    async listCategory(req, res) {
        try {
            const categories = await Category.find({});
            res.status(200).json({data: categories, message: 'Success'});

        } catch (error) {
            res.status(400).json({message: error.message});
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
            res.status(400).json({message: error.message});
        }
    }
}

module.exports = new CategoryController;