import mongoose from 'mongoose';

export interface ILaboratory {
  code: number;
  name: string;
  license: string;
}

interface laboratoryModelInterface extends mongoose.Model<LaboratoryDoc> {
  build(attr: ILaboratory): LaboratoryDoc;
}

export interface LaboratoryDoc extends mongoose.Document {
  code: number;
  name: string;
  license: string;
}

const laboratorySchema = new mongoose.Schema({
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

laboratorySchema.statics.build = (attr: ILaboratory) => {
  return new Laboratory(attr);
};

const Laboratory = mongoose.model<LaboratoryDoc, laboratoryModelInterface>('Laboratory', laboratorySchema);
/*Laboratory.build({
  code: 0,
  name: 'Fabricante',
  license: '0000000',
});*/

export { Laboratory };
