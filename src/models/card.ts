import mongoose from "mongoose";
import { ICard } from "types";
import { userSchema } from "./user";

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    userSchema,
    type: mongoose.Types.ObjectId,
    required: true,
  },
  likes: [{
    userSchema,
    type: mongoose.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

export default mongoose.model<ICard>('card', cardSchema);
