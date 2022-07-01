const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name must be less than 100 characters'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, 'Phone is required'],
    maxlength: [11, 'Phone must be less than 11 characters'],
  },
  paidAmount: {
    type: Number,
    required: [true, 'Paid amount is required'],
    maxlength: [5, 'Amount must be less than 5 characters'],
    default: 0.0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Billing', billingSchema);
