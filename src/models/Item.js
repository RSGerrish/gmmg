import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  imgUrl: {
    type: String,
    required: true
  },
  // options stores the sizes as keys and the corresponding price as its value
  options: {
    type: Object,
    required: true
  },
  disData: {
    type: Object,
    required: false
  },
  quantity: {
    type: Number,
    required: true
  },
  onSale: {
    type: Boolean,
    required: true
  }
}, { collection: 'items' });

export default mongoose.models.Item || mongoose.model('Item', ItemSchema)