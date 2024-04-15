const express = require('express');
const router = express.Router();
const authcontrollers = require('../controllers/auth-controller');
const validate = require('../middleware/validate-middleware');
const {signUpSchema, loginSchema} = require('../validator/auth-validator');
const authMiddleware = require('../middleware/auth-middleware');

router.route('/').get(authcontrollers.home);

router.route('/register').post(validate(signUpSchema), authcontrollers.register);
router.route('/login').post(validate(loginSchema), authcontrollers.login);
router.route('/user').get(authMiddleware, authcontrollers.user);

module.exports = router;
