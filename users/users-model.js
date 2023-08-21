import mongoose from "mongoose";
import usersSchema from "./users-schema.js";

// Create the index on the usersSchema
usersSchema.index({ "userBadges.gameId": 1 });

const usersModel = mongoose.model("Users", usersSchema);
usersModel.createIndexes();

export default usersModel;