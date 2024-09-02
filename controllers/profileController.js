const User = require('../models/user');

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { newRole } = req.body;

  // Check if new role is valid
  if (!['Manager', 'Employee'].includes(newRole)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  // Update user role
  try {
    const user = await User.findByIdAndUpdate(id, { role: newRole }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const getProfile = async (req, res) => {
  const user = await User.findById(req.userID);
  res.json(user);
}


module.exports = {
  updateRole,
  getProfile
};