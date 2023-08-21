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
  userBadges: [
    {
      gameId: { type: String, required: true }, 
      badgeType: { type: String, required: true }, // Type of badge so "Like", "Disliked", "Played", etc...
      badgeState: { type: Boolean, default: false, required: true }
    }
  ],
  lists:{
    currentlyPlaying: [
      { 
        gameId: { type: String, required: true }, 
        gameName: { type: String, required: true },
        addedOn: { type: Date, default: Date.now }
      }
    ],
    wantToPlay: [
      { 
        gameId: { type: String, required: true }, 
        gameName: { type: String, required: true },
        addedOn: { type: Date, default: Date.now }
      }
    ],
    played: [
      { 
        gameId: { type: String, required: true }, 
        gameName: { type: String, required: true },
        addedOn: { type: Date, default: Date.now }
      }
    ],
    dislikeList: [
      { 
        gameId: { type: String, required: true }, 
        gameName: { type: String, required: true },
        addedOn: { type: Date, default: Date.now }
      }
    ],

    likeList: [
      { 
        gameId: { type: String, required: true }, 
        gameName: { type: String, required: true },
        addedOn: { type: Date, default: Date.now }
      }
    ],
    followersList: [
      { 
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        username: { type: String, required: true }, 
        addedOn: { type: Date, default: Date.now }
      }
    ],
    followingList: [
      { 
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        username: { type: String, required: true }, 
        addedOn: { type: Date, default: Date.now }
      }
    ]
  }
}, { collection: "users" });

export default usersSchema;
