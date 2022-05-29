import mongoose from 'mongoose';

const LaboratorySchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
});

export { LaboratorySchema };
