const Billing = require('../models/billing');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Get all Billings   =>   GET /api/billing-list
exports.getBillings = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 10;
  const billingsCount = await Billing.countDocuments();

  // sum the paidAmount of all billings
  const totalPaidAmount = await Billing.aggregate([
    { $group: { _id: null, total: { $sum: '$paidAmount' } } },
  ]);

  const features = new APIFeatures(Billing.find(), req.query).search();

  let billings = await features.query.clone();
  let filteredBillingsCount = billings.length;

  features.pagination(resPerPage);
  billings = await features.query;

  res.status(200).json({
    success: true,
    billingsCount,
    resPerPage,
    filteredBillingsCount,
    billings,
    totalPaidAmount,
  });
});

// Create a new billing   =>   POST /api/add-billing
exports.addBilling = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const billing = await Billing.create(req.body);
  res.status(201).json({
    success: true,
    billing,
  });
});

// Update a billing   =>   PUT /api/update-billing/:id
exports.updateBilling = catchAsyncErrors(async (req, res, next) => {
  let billing = await Billing.findById(req.params.id);
  if (!billing) {
    return next(new ErrorHandler('Billing not found', 404));
  }

  billing = await Billing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    billing,
  });
});

// Delete a billing   =>   DELETE /api/delete-billing/:id
exports.deleteBilling = catchAsyncErrors(async (req, res, next) => {
  const billing = await Billing.findById(req.params.id);
  if (!billing) {
    return next(new ErrorHandler('Billing not found', 404));
  }

  await billing.remove();
  res.status(200).json({
    success: true,
    message: 'Billing deleted',
  });
});
