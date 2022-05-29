import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export { CategorySchema };
