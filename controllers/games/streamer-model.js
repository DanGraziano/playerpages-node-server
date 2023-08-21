import mongoose from "mongoose";
import streamerPicksSchema from "./streamer-schema.js";

const streamerModel = mongoose.model("StreamerPicks", streamerPicksSchema);

export default streamerModel;