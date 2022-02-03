const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: String,
  },
  size: {
    type: String
  },
  category: {
    type: String
  } 
}); 


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;