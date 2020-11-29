const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderShema = new Schema({
  userid:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  subtotal :{
    type: Number,
    required: true
  }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Order', orderShema);