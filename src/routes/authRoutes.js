const express = require('express');
const { register, login, createEmployee } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/inputValidation');
const { authenticateJWT } = require('../middleware/authenticateJWT');
const { checkRole } = require('../middleware/roleAuth');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/create-employee', 
  authenticateJWT,
  checkRole(['employee']),
  validateRegister,
  createEmployee
);

module.exports = router;
