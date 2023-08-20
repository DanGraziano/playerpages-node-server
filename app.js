import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import AuthController from "./users/auth-controller.js";
import GamesController from "./controllers/games/games-controller.js";
import ReviewsController from "./controllers/reviews/reviews-controller.js";
import "dotenv/config";


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb+srv://dan:secretPassword123@cluster0.bgqxbph.mongodb.net/playerpages?retryWrites=true&w=majority";
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
const PORT = process.env.PORT;

const db = mongoose.connection;

db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));


const corsOptions = {
    origin: 'http://localhost:3000', // specify the allowed origin
    methods: 'POST, GET, PUT, DELETE',  // specify the allowed methods
    allowedHeaders: 'content-type', // specify the allowed headers
    credentials: true, // This line is added to allow credentials (cookies)
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


// Define the /api/currentUser endpoint
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
HelloController(app);

app.listen(PORT);
