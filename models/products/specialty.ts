import mongoose from 'mongoose';

export interface ISpecialty {
  code: number;
  name: string;
}

interface specialtyModelInterface extends mongoose.Model<SpecialtyDoc> {
  build(attr: ISpecialty): SpecialtyDoc;
}

export interface SpecialtyDoc extends mongoose.Document {
  code: number;
  name: string;
}

const specialtySchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

specialtySchema.statics.build = (attr: ISpecialty) => {
  return new Specialty(attr);
};

const Specialty = mongoose.model<SpecialtyDoc, specialtyModelInterface>('Specialty', specialtySchema);
Specialty.build({
  code: 0,
  name: 'Otros',
});

export { Specialty };
