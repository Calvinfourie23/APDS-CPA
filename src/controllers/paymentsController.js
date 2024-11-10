const Payment = require('../models/paymentModel');
const User = require('../models/userModel');

exports.createPayment = async (req, res, next) => {
  try {
    const { amount, currency, recipient } = req.body;
    const payment = await Payment.create({
      user: req.user.id,
      amount,
      currency,
      recipient
    });
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};

exports.getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.user.id });
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await User.find({ role: 'customer' });
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const employee = await User.create({
      email,
      password,
      role: 'employee'
    });
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    next(error);
  }
};
