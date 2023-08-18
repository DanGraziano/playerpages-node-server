import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
  profilePicture: { type: String, default: null }, // URL of the profile picture
  firstName: { type: String, default: null },
  lastName: { type: String, default: null }, 
  birthday: { type: Date, default: null },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [
    {
      gameId: { type: String, required: true }, // ID of the game being reviewed
      content: { type: String, required: true }, // Text of the review
      createdAt: { type: Date, default: Date.now } // Date when the review was created
    }
  ],
  lists: { // All would be array of // Array of game IDs
    currentlyPlaying: [{ type: String }], 
    wantToPlay: [{ type: String }], 
    played: [{ type: String }],
    dislikeList: [{ type: String }],
    likeList: [{ type: String }],
  }
}, { collection: "users" });

export default usersSchema;
