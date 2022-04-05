import mongoose from "mongoose";

export default interface TokenPayload {
    userId:  mongoose.Schema.Types.ObjectId;
  }