const authRouter = require('express').Router();

const { authMiddleware } = require('../middlewares');

const authController = require('../controlers/auth.controller');

authRouter.post('/login',
    authMiddleware.isLoginBodyValid,
    authMiddleware.isUserPresentForAuth,
    authController.login);

authRouter.post('/refreshToken',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

authRouter.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

authRouter.post('/logoutAllDevices',
    authMiddleware.checkAccessToken,
    authController.logoutAllDevices);

module.exports = authRouter;