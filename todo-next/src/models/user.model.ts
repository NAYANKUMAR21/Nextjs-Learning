import mongoose from 'mongoose';

const file = {
  username: {
    type: String,
    require: ['username is required mandatory', true],
    unique: true,
  },
  email: {
    type: String,
    require: ['email is required mandatory', true],
    unique: true,
  },
  password: { type: String },
  createdAt: { type: Date },
};

const userSchema = new mongoose.Schema(file, { versionKey: false });
const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;
