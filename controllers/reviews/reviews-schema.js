import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  gameId: { type: String, required: true }, // ID of the game being reviewed
  username: { type: String, required: true }, // Username of the reviewer
  content: { type: String, required: true }, // Text of the review
  createdOn: { type: Date, default: Date.now } // Date when the review was created
}, { collection: "reviews" });

export default reviewsSchema;