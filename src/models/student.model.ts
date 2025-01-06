import mongoose from "mongoose";
import { Istudent } from "../interfaces/student.model.interface";

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
    class: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roleno: {
      type: Number,
       required:true
      
    },
   
  },
  { timestamps: true }
);

const userModel = mongoose.model<Istudent>("user", UserSchema);

export default userModel;
