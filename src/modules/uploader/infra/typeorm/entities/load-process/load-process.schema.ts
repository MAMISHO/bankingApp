import mongoose from 'mongoose';
import { LoadProcessType } from '../../../../entities/load-process-type.enum';

const LoadProcessSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      // index: true,
      // unique: true,
    },
    startDateTime: {
      type: Date,
      required: true,
      default: new Date(Date.now()),
    },
    endDateTime: {
      type: Date,
    },
    fileName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    userName: {
      type: String,
      required: true,
    },
    loadProcessType: {
      type: LoadProcessType,
    },
    items: [
      {
        // type: [LoadProcessItemSchema], // embebido
        // required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoadProcessItem',
      },
    ],
  },
  { collection: 'load_process' }
);

export { LoadProcessSchema };
