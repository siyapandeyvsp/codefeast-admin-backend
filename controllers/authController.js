const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// 🔐 Generate access token (short-lived)
const generateAccessToken = (admin) => {
  return jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

// 🔁 Generate refresh token (long-lived)
const generateRefreshToken = (admin) => {
  return jwt.sign(
    { id: admin._id },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

// 🚪 Login Controller
exports.loginAdmin = async (req, res) => {
  console.log('Login attempt:', req.body); // Log the login attempt
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await admin.matchPassword(password);
    console.log('Entered password:', password);
    console.log('Hashed password:', admin.password);
    console.log('Password match:', isMatch);    
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);

    res.status(200).json({
      accessToken,
      refreshToken,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// 📝 Signup Controller
exports.signupAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    // Hash the password before saving
//const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin and save it
    const newAdmin = new Admin({
      email,
      password, // Mongoose will hash it using the pre-save hook
    });

    await newAdmin.save();

    // Generate access and refresh tokens
    const accessToken = generateAccessToken(newAdmin);
    const refreshToken = generateRefreshToken(newAdmin);

    res.status(201).json({
      accessToken,
      refreshToken,
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};

// 🚪 Get Admin Details Controller
exports.getAdminDetails = async (req, res) => {
    try {
      // req.user is set by the protect middleware (after successful JWT verification)
      const admin = await Admin.findById(req.user.id); // Use the decoded user id from the token
      if (!admin) return res.status(404).json({ message: 'Admin not found' });
  
      res.status(200).json({
        id: admin._id,
        email: admin.email,
        role: admin.role,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching admin details', error: error.message });
    }
  };
