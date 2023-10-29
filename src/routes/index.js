require('express-group-routes');
const path = require('path');
const multer = require('multer');
const ProductController = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, path.join(__dirname, '../public/uploads'), function(error, success) {
            if(error) {
                console.log(error);
            }
        });
    },
    filename: function(req, file, cb) {
        const name = Date.now()+'-'+file.originalname;
        cb(null, name, function(error, success) {
            if(error) {
                console.log(error);
            }
        });
    }
});

const upload = multer({storage: storage});

function route(app) {

    app.group("/api", (router) => {
        
        router.get("/product", ProductController.getListProduct);
        router.post("/product/store", upload.single("image"), ProductController.store);
        router.get("/product/detail/:slug", ProductController.detail);

        //category
        router.get("/category", CategoryController.listCategory);
        router.post("/category/store", upload.single(), CategoryController.store);
    });
}

module.exports = route;