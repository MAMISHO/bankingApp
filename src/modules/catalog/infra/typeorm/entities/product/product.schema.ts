import mongoose from 'mongoose';
import { Class } from '../../../../entities/product.enum';
const ProductSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  nationalCode: {
    type: String,
  },
  specialties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Specialty',
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  denomination: {
    type: String,
    required: true,
  },
  presentation: {
    type: String,
    required: true,
  },
  laboratory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Laboratory',
    required: true,
  },
  ingredients: {
    type: String,
  },
  class: {
    type: Class,
  },
  steril: {
    type: Boolean,
  },
  healthIndications: {
    type: String,
  },
  indications: {
    type: String,
  },
  function: {
    type: String,
  },
  howToUse: {
    type: String,
  },
  specialConditions: {
    type: String,
  },
  cautionsWarnings: {
    type: String,
  },
  pao: {
    type: String,
  },
  foodIntolerance: {
    type: String,
  },
  tags: {
    type: String,
  },
});

export { ProductSchema };
