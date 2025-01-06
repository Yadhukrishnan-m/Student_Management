import mongoose from "mongoose";
import { Iadmin } from '../interfaces/admin.model.interface'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  
    password: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const userModel = mongoose.model<Iadmin>("admin", UserSchema);

export default userModel;
