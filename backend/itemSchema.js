const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('gameboy', chatSchema);
