import mongoose from 'mongoose';
import { LoadProcessType } from '../../../../entities/load-process-type.enum';
import { LoadProcessItemSchema } from '../load-process-item/load-process-item.schema';

const LoadProcessSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      index: true,
      unique: true,
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
      default: false,
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
    items: {
      type: [LoadProcessItemSchema],
    },
  },
  { collection: 'load_process' }
);

export { LoadProcessSchema };
