import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose"

const weatherSchema = new Schema({
  city: {
    type: String,
    unique: true,
    lowercase: true,
  },
  temperature: {
    type: Number,
  },
  weatherDescription: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

weatherSchema.plugin(normalize);


export const Weather = model("Weather", weatherSchema);
