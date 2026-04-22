import mongoose, { Schema } from "mongoose";


const todoSchema = new Schema(
  {
    name: {
      type: String,
    },
    desc: {
      type: String,
    
    },

  },
  {
    timestamps: true,
  }
);

export const TodoModule = mongoose.model("Todo", todoSchema);