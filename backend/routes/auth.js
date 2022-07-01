const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require('../controllers/authController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/registration').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser, getUserProfile);

module.exports = router;
