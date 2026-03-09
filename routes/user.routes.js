const userController=require('../controllers/user.controller');
const userMiddleware=require('../middlewares/user.middlewares');
const authmiddleware=require('../middlewares/auth.middlewares');

const route=(app)=>{
    app.patch('/mba/api/v1/user/:id',
        authmiddleware.isAuthenticated,
        userMiddleware.validateUpdateRequest,
        authmiddleware.isAdmin,
        userController.update,
    );
}


module.exports=route;