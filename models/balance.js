const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true
  },
  balance: {
    type: Number,
    default: 0,
    required: true
  },
  isCredit: {
    type: Boolean,
    required: true,
    default: false
  },
  amount: {
    type: Number,
    required: true
  },
  dateOf: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Balance", balanceSchema);
