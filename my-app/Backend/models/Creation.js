// models/Creation.js
import mongoose from 'mongoose';

const creationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.models.Creation
  ? mongoose.models.Creation
  : mongoose.model('Creation', creationSchema);