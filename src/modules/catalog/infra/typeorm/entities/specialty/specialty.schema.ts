import mongoose from 'mongoose';

const SpecialtySchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export { SpecialtySchema };
