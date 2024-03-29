import mongoose from "mongoose";

const { Schema } = mongoose;

const FunctionRunTimerSchema = new Schema({
  functionName: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

const FunctionRunTimerModel = mongoose.model(
  "FunctionRunTimer",
  FunctionRunTimerSchema
);

export default FunctionRunTimerModel;
