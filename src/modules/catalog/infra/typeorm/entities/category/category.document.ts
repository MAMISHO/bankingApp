import mongoose from 'mongoose';
export interface CategoryDoc extends mongoose.Document {
  code: number;
  name: string;
  description: string;
}
