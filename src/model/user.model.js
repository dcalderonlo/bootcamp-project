import mongoose from "mongoose";
import { userSchema } from "./schema.model.js";

export const userModel = mongoose.model("user", userSchema)