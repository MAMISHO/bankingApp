import mongoose from 'mongoose';

export interface LaboratoryDoc extends mongoose.Document {
  code: number;
  name: string;
  license: string;
}
