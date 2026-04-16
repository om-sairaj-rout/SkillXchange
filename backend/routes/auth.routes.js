const express = require('express');
const authRouter = express.Router();

const RegisterController = require('../controllers/authControllers/userRegister.controllers');
const LoginController = require('../controllers/authControllers/userLogin.controllers');
const LogoutController = require('../controllers/authControllers/userLogout.controllers');
const authCheckController = require('../controllers/authControllers/authCheck.controllers');
const { checkAuth } = require('../middlewares/auth.middleware');

authRouter.post('/user/register', RegisterController);
authRouter.post('/user/login', LoginController);
authRouter.post('/user/logout', LogoutController);
authRouter.get('/auth/check', checkAuth, authCheckController);

module.exports = authRouter;