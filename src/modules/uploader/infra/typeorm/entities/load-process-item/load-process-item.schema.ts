import mongoose from 'mongoose';

const LoadProcessItemSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      index: true,
      // unique: true,
    },
    uuidLoadProcess: {
      type: String,
      required: true,
    },
    dataItem: {
      type: String,
      required: true,
    },
    loadProcess: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'LoadProcess',
    },
  },
  { collection: 'load_process_item' }
);

export { LoadProcessItemSchema };
