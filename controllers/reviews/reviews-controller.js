import * as reviewsDao from './reviews-dao.js';
import usersModel from "../../users/users-model.js";

const ReviewsController = (app) => {
    const addReview = async (req, res) => {
        try {
        const { userId, gameId, reviewText } = req.body;
        const user = await usersModel.findById(userId); // Fetch the user to get their username
        const result = await reviewsDao.addReview(userId, gameId, user.username, reviewText);
        res.json({ success: true, message: 'Review added', result });
        } catch (error) {
        console.error('Error adding the review:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
        }
    };
  
    const removeReview = async (req, res) => {
        try {
          const { userId, gameId } = req.body;
          const result = await reviewsDao.removeReview(userId, gameId);
          res.json({ success: true, message: 'Review removed', result });
        } catch (error) {
          console.error('Error removing the review:', error);
          res.status(500).json({ success: false, message: 'Internal Server Error', error });
        }
      };
      
      const getReviewsByGameId = async (req, res) => {
        try {
          const { gameId } = req.params; // Assume you pass the game ID in the URL as a path parameter
          const reviews = await reviewsDao.findReviewsByGameId(gameId);
          res.json({ success: true, reviews });
        } catch (error) {
          console.error('Error finding reviews by game ID:', error);
          res.status(500).json({ success: false, message: 'Internal Server Error', error });
        }
      };

      const getReviewsByUserId = async (req, res) => {
        try {
          const { userId } = req.params; // Assume you pass the user ID in the URL as a path parameter
          const reviews = await reviewsDao.findReviewsByUserId(userId);
          res.json({ success: true, reviews });
        } catch (error) {
          console.error('Error finding reviews by user ID:', error);
          res.status(500).json({ success: false, message: 'Internal Server Error', error });
        }
      };
      

      


  app.post("/api/reviews/addReview", addReview);
  app.post("/api/reviews/removeReview", removeReview);
  app.get("/api/reviews/game/:gameId", getReviewsByGameId);
  app.get("/api/reviews/user/:userId", getReviewsByUserId);

};

export default ReviewsController;


