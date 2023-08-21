import mongoose from "mongoose";

const streamerPicksSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  gameId: { type: String, required: true }, // ID of the game being reviewed
  gameName: { type: String, required: true }, // Name of the game being reviewed
  username: { type: String, required: true }, // Username of the reviewer
  createdOn: { type: Date, default: Date.now } // Date when the review was created
}, { collection: "streamerPicks" });

export default streamerPicksSchema;