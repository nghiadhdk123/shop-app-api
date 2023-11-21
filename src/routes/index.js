require('express-group-routes');
const path = require('path');
const multer = require('multer');
const ProductController = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const ChatController = require('../controllers/ChatController');
const auth = require('../middlewares/authenticate');
const checkRole = require('../middlewares/checkRole');

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
        router.get("/product/detail/:slug", ProductController.detail);

        //category
        router.get("/category", CategoryController.listCategory);
        router.get("/category/:slug", CategoryController.detail);


        //admin
        router.group("/admin", (routeAdmin) => {
            //Product

            routeAdmin.get("/product", auth, ProductController.getListProduct);
            routeAdmin.post("/product/store", auth, upload.single("image"), ProductController.store);

            //Category
            routeAdmin.get("/category", auth, CategoryController.listCategory);
            routeAdmin.post("/category/store", auth, upload.single(), CategoryController.store);

            //User
            routeAdmin.get("/user", auth, UserController.listUser);
            // routeAdmin.get("/user", [auth, (req, res, next) => checkRole(req, res, next, ['super-admin-1', 'create-user-2'])], UserController.detail);
            routeAdmin.post("/user/store", auth, upload.single(), UserController.store);

            //Chat
            routeAdmin.post("/chat/store", upload.single(), ChatController.store);
            routeAdmin.get("/chat/t/:chatId", ChatController.findChat);
            routeAdmin.post("/chat/sendMessage", upload.single(), ChatController.sendMessage);

            //auth
            routeAdmin.post("/auth/login", upload.single(), AuthController.login);
            // routeAdmin.get("/auth/logout", AuthController.logout);
        });
    });
}

module.exports = route;