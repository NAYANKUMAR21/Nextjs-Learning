import mongoose from 'mongoose';

const file = {
  todo: { type: String, require: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: ['Please enter User Id', true],
  },
  update: { type: Boolean, default: false },
};

const todoSchema = new mongoose.Schema(file, { versionKey: false });
const todoModel = mongoose.models.todo || mongoose.model('todo', todoSchema);

export default todoModel;
