const express = require('express');
const { createPayment, getPayments, getAllPayments, getAllCustomers } = require('../controllers/paymentsController');
const { authenticateJWT } = require('../middleware/authenticateJWT');
const { checkRole } = require('../middleware/roleAuth');
const { validatePayment, validateEmployee } = require('../middleware/inputValidation');

const router = express.Router();

// Apply JWT authentication to all routes
router.use(authenticateJWT);

// Customer routes
router.post('/', 
  checkRole(['customer']), 
  validatePayment, 
  createPayment
);

router.get('/', 
  checkRole(['customer']), 
  getPayments
);

// Employee routes
router.get('/employee', 
  checkRole(['employee']), 
  getAllPayments
);

router.get('/employee/customers', 
  checkRole(['employee']), 
  getAllCustomers
);

/*router.post('/employee/create',
  checkRole(['employee']),
  validateEmployee,
  createEmployee
);*/

module.exports = router;
