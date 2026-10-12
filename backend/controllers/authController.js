import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { isNonEmptyString, sanitizeString } from '../utils/security.js';

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'zips_academic_institution_secure_jwt_key_2026';
  return jwt.sign({ id }, secret, {
    expiresIn: '7d', // Hardened from 30d to 7d for enhanced administrative session security
  });
};

// @desc   Admin Login
// @route  POST /api/auth/login
// @access Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email and password.',
      });
    }

    const cleanEmail = sanitizeString(email).toLowerCase();
    const user = await User.findOne({ email: cleanEmail }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your email and password.',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact the administrator.',
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    // Set HTTP-only cookie
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    };

    res.cookie('token', token, options);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin Logout
// @route  POST /api/auth/logout
// @access Private
export const logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

// @desc   Get Current Logged in User
// @route  GET /api/auth/me
// @access Private
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// @desc   Get All Staff Users
// @route  GET /api/auth/users
// @access Private (SUPER_ADMIN)
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Create New User / Staff
// @route  POST /api/auth/users
// @access Private (SUPER_ADMIN)
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email already exists.',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'ADMIN',
    });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
