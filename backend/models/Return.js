const mongoose = require('mongoose');

const ReturnSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  product: {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    purchaseDate: { type: String, required: true },
  },
  reason: { type: String, required: true },
  condition: {
    type: String,
    enum: ['new', 'damaged', 'broken', 'unusable'],
    required: true,
  },
  imageIds: [String],
  suggestion: {
    type: String,
    enum: ['Resell', 'Refurbish', 'Dispose', 'pending'],
    default: 'pending',
  },
  status: {
    type: String,
    enum: ['pending', 'inspected', 'assigned', 'resolved'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Return', ReturnSchema);
