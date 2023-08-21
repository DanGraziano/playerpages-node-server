import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
  profilePicture: { type: String}, // URL of the profile picture
  bio: { type: String },
  firstName: { type: String },
  lastName: { type: String }, 
  birthday: { type: Date },
  numLikes: { type: Number, default: 0 },
  numDislikes: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  numFollowers: { type: Number, default: 0 },
  numFollowing: { type: Number, default: 0 },
  reviews: [
    {
      gameId: { type: String, required: true }, // ID of the game being reviewed
      content: { type: String, required: true }, // Text of the review
      createdOn: { type: Date, default: Date.now } // Date when the review was created
    }
  ],
  lists:{
    currentlyPlaying: [
      { 
        gameId: { type: String, required: true }, 
        gameName: { type: String, required: true },
      }
    ],
    wantToPlay: [
      { 
        gameId: { type: String, required: true }, 
        gameName: { type: String, required: true },
      }
    ],
    played: [
      { 
        gameId: { type: String, required: true }, 
        gameName: { type: String, required: true },
      }
    ],
    dislikeList: [
      { 
        gameId: { type: String, required: true }, 
        gameName: { type: String, required: true },
      }
    ],

    likeList: [
      { 
        gameId: { type: String, required: true }, 
        gameName: { type: String, required: true },
      }
    ],
  }
}, { collection: "users" });

export default usersSchema;
