
const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  items: {
    type: [String],
    default: []
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Data', DataSchema);
