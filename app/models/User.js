import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
});

// The third parameter explicitly specifies the collection name
export default mongoose.models.User || mongoose.model('User', UserSchema, 'users');
