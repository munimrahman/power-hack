const express = require('express');
const router = express.Router();

const {
  getBillings,
  addBilling,
  updateBilling,
  deleteBilling,
} = require('../controllers/billingController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/billing-list').get(getBillings);
router.route('/add-billing').post(isAuthenticatedUser, addBilling);
router.route('/update-billing/:id').put(isAuthenticatedUser, updateBilling);
router.route('/delete-billing/:id').delete(isAuthenticatedUser, deleteBilling);

module.exports = router;
