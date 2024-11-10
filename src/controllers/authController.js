const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password, role: 'customer' });
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password, role: 'employee' });
    res.status(201).json({
      message: 'Employee created successfully',
      employee: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    const redirectUrl = user.role === 'employee' 
      ? '/employee-dashboard' 
      : '/customer-dashboard';
    
    res.json({ 
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      redirectUrl
    });
  } catch (error) {
    next(error);
  }
};
