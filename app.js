import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import UserController from "./users/users-controller.js";
import AuthController from "./users/auth-controller.js";
import GamesController from "./controllers/games/games-controller.js";
import ReviewsController from "./controllers/reviews/reviews-controller.js";
import StreamerController from "./controllers/games/streamer-controller.js";

import "dotenv/config";
import bodyParser from "body-parser";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
const PORT = process.env.PORT;

const db = mongoose.connection;

db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));


const corsOptions = {
    origin: 'http://localhost:3000' || "https://melodic-biscuit-a09bed.netlify.app/", 
    methods: 'POST, GET, PUT, DELETE', 
    allowedHeaders: 'content-type', 
    credentials: true,
  };


app.use(cors(corsOptions));

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // Cookies last 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
  
app.use(session(sessionOptions));
app.use(express.json());
app.use(bodyParser.json());


app.get('/api/currentUser', (req, res) => {
    if (req.session.user) {
      res.json({ user: req.session.user });
    } else {
      res.status(401).json({ message: 'Not logged in' });
    }
  });


AuthController(app);
UserController(app);
GamesController(app);
ReviewsController(app);
StreamerController(app);

app.listen(PORT || 4000);
