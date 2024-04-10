const express = require('express');
const router = express.Router();
const authcontrollers = require('../controllers/auth-controller');
const validate = require('../middleware/validate-middleware');
const signUpSchema = require('../validator/auth-validator');

router.route('/').get(authcontrollers.home);

router.route('/register').post(validate(signUpSchema), authcontrollers.register);
router.route('/login').post(authcontrollers.login);

module.exports = router;
