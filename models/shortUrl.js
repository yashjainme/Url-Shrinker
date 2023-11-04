

import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { Schema } from "mongoose";
const urlId = nanoid(); // By default, it generates a 21-character URL-friendly ID

const shortUrlsSchema = new Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: urlId,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlsSchema);

// Export the model class using ES6-style export
export default ShortUrl;