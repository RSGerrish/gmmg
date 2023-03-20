import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  },
  lastLogin: {
    type: Date,
    required: false
  },
  cart: {
    type: Array,
    required: false
  }
}, { collection: 'users' });

export default mongoose.models.User || mongoose.model('User', UserSchema)