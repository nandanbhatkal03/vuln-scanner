const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
  target: String,
  ports: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scan', ScanSchema);
