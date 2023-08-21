import mongoose from "mongoose";

const streamerPicksSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  gameId: { type: String, required: true },
  gameName: { type: String, required: true }, 
  username: { type: String, required: true }, 
  createdOn: { type: Date, default: Date.now }
}, { collection: "streamerPicks" });

export default streamerPicksSchema;