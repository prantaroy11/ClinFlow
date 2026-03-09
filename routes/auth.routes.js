const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const userMiddleware=require('../middlewares/auth.middlewares');

const routes = (app) => {
    app.post('/mba/api/v1/auth/signup', authMiddleware.validateSignupRequest, authController.signUp);
    app.post('/mba/api/v1/auth/signin', authMiddleware.validateSigninRequest, authController.signIn);

    app.patch('/mba/api/v1/auth/reset',
        authMiddleware.isAuthenticated,
        userMiddleware.validateResetPasswordRequest,
        authController.resetPassword
    );
}

module.exports = routes;