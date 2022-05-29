import mongoose from 'mongoose';
export interface SpecialtyDoc extends mongoose.Document {
  code: number;
  name: string;
}
