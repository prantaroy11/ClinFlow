const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middlewares');

const routes = (app) => {
    app.post('/mba/api/v1/auth/signup', authMiddleware.validateSignupRequest, authController.signUp);
    app.post('/mba/api/v1/auth/signin', authController.signIn);
}

module.exports = routes;