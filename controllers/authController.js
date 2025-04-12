const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashed });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error('❌ Error in register:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token });
  } catch (err) {
    console.error('❌ Error in login:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// DELETE /api/auth/delete - Auth: Delete own account
exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (user.role === 'admin') return res.status(403).json({ msg: 'Admins cannot delete their own account' });

    await user.deleteOne();
    res.json({ msg: 'Account deleted' });
  } catch (err) {
    console.error('❌ Error in deleteAccount:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};